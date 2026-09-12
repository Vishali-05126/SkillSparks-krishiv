const http = require('http')
const fs = require('fs')
const path = require('path')
const AiMatchingEngine = require('./services/aiMatchingEngine')
const SkillDnaEngine = require('./services/skillDnaEngine')
const GamificationEngine = require('./services/gamificationEngine')

const sessions = new Map()

const projects = [
    { id: 1, title: 'The mindful dashboard', description: 'A calmer way for teams to understand their week and protect focus.', tags: ['UX research', 'No-code'], people: 4, status: 'Looking for skills' },
    { id: 2, title: 'Dinner for everyone', description: 'Making healthy, affordable recipes feel genuinely exciting to cook.', tags: ['Food', 'Photography'], people: 3, status: 'Open to swap' },
    { id: 3, title: 'Tiny climate wins', description: 'A community toolkit for making lower-impact choices feel achievable.', tags: ['Writing', 'Climate'], people: 7, status: 'In progress' },
]

function sendJson(response, status, body) {
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })
    response.end(JSON.stringify(body))
}

function readRequestBody(request) {
    return new Promise((resolve, reject) => {
        let body = ''
        request.on('data', (chunk) => { body += chunk })
        request.on('end', () => resolve(body))
        request.on('error', reject)
    })
}

function parseJsonBody(rawBody) {
    if (!rawBody) return {}
    if (typeof rawBody === 'object') return rawBody
    try {
        return JSON.parse(rawBody)
    } catch {
        return {}
    }
}

async function createContact(request) {
    const body = parseJsonBody(await readRequestBody(request))
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const message = String(body.message || '').trim()
    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Name, valid email, and message are required.' }

    const directory = path.join(__dirname, 'data')
    const file = path.join(directory, 'contacts.json')
    fs.mkdirSync(directory, { recursive: true })
    let contacts = []
    if (fs.existsSync(file)) contacts = JSON.parse(fs.readFileSync(file, 'utf8'))
    contacts.push({ name, email, message, date: new Date().toISOString() })
    fs.writeFileSync(file, JSON.stringify(contacts, null, 2))
    return { ok: true }
}

async function getUsers() {
    const directory = path.join(__dirname, 'data')
    const file = path.join(directory, 'users.json')
    fs.mkdirSync(directory, { recursive: true })
    if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, 'utf8'))
    }
    return []
}

async function saveUsers(users) {
    const directory = path.join(__dirname, 'data')
    const file = path.join(directory, 'users.json')
    fs.mkdirSync(directory, { recursive: true })
    fs.writeFileSync(file, JSON.stringify(users, null, 2))
}

function generateToken() {
    return 'token_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
}

function publicUser(user) {
    const { password, ...safeUser } = user
    return safeUser
}

function authenticate(request) {
    const header = String(request.headers?.authorization || '')
    const token = header.replace(/^Bearer\s+/i, '').trim()
    return sessions.get(token) || null
}

function defaultUserStats(user) {
    const skills = user.skillDna || []
    const totalXp = Number(user.totalXp || 0)
    const level = GamificationEngine.calculateLevel(totalXp)
    return {
        name: user.name,
        ...level,
        currentXp: level.progressToNextLevel,
        skillCoins: Number(user.skillCoins || 0),
        streak: Number(user.streak || 0),
        badges: user.badges || [],
        rank: 1,
        totalUsers: 1,
        connections: (user.connections || []).length,
        skillsLearned: Number(user.skillsLearned || 0),
        peopleTeached: Number(user.peopleTeached || 0),
        projectsCompleted: Number(user.projectsCompleted || 0),
        hoursTeached: Number(user.hoursTeached || 0),
        hoursLearned: Number(user.hoursLearned || 0),
        skillConfidenceAverage: skills.length ? skills.reduce((sum, skill) => sum + skill.confidence, 0) / skills.length : 0,
        reputationScore: Number(user.reputation_score || 0),
        skillDna: skills,
    }
}

async function handleRegister(request) {
    const body = parseJsonBody(await readRequestBody(request))
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim()
    const password = String(body.password || '').trim()

    if (!name || !email || !password) {
        return { status: 400, body: { error: 'Name, email, and password are required.' } }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { status: 400, body: { error: 'Invalid email format.' } }
    }

    if (password.length < 6) {
        return { status: 400, body: { error: 'Password must be at least 6 characters.' } }
    }

    const users = await getUsers()
    if (users.find((u) => u.email === email)) {
        return { status: 400, body: { error: 'Email already registered.' } }
    }

    const userId = 'user_' + Date.now()
    const token = generateToken()
    const user = { id: userId, name, email, password, skills: [], lookingFor: [], bio: '' }

    users.push(user)
    await saveUsers(users)
    sessions.set(token, user.id)

    return {
        status: 201,
        body: {
            token,
            user: publicUser(user),
        },
    }
}

async function handleLogin(request) {
    const body = parseJsonBody(await readRequestBody(request))
    const email = String(body.email || '').trim()
    const password = String(body.password || '').trim()

    if (!email || !password) {
        return { status: 400, body: { error: 'Email and password are required.' } }
    }

    const users = await getUsers()
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
        return { status: 401, body: { error: 'Invalid email or password.' } }
    }

    const token = generateToken()
    sessions.set(token, user.id)
    return {
        status: 200,
        body: {
            token,
            user: publicUser(user),
        },
    }
}

async function handleAiChat(request, env = process.env) {
    if (request.method !== 'POST') {
        return { status: 405, body: { error: 'Only POST requests are allowed.' } }
    }

    const body = parseJsonBody(request.body)
    const prompt = String(body.prompt || '').trim()
    if (!prompt) {
        return { status: 400, body: { error: 'Prompt is required.' } }
    }

    const apiKey = String(env.OPENAI_API_KEY || '').trim()
    if (!apiKey) {
        return {
            status: 500,
            body: {
                error: 'AI_API_KEY_MISSING',
                message: 'AI API key is not configured. Set OPENAI_API_KEY in the backend environment.',
            },
        }
    }

    const model = String(env.OPENAI_MODEL || 'gpt-4o-mini').trim()
    const baseUrl = String(env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')

    const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        }),
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        return {
            status: response.status || 500,
            body: {
                error: data.error?.message || 'AI request failed.',
                details: data.error || null,
            },
        }
    }

    const answer = data.choices?.[0]?.message?.content?.trim() || 'I could not generate a reply right now.'
    return {
        status: 200,
        body: { prompt, answer, model },
    }
}

const server = http.createServer(async (request, response) => {
    if (request.method === 'OPTIONS') return sendJson(response, 204, {})

    if (request.method === 'GET' && request.url === '/health') {
        return sendJson(response, 200, { ok: true, service: 'skillswap-backend' })
    }

    if (request.method === 'GET' && request.url === '/') {
        response.writeHead(302, { Location: process.env.FRONTEND_URL || 'http://localhost:3000' })
        return response.end()
    }

    if (request.method === 'GET' && request.url === '/api/projects') {
        return sendJson(response, 200, { projects })
    }

    if (request.method === 'GET' && request.url === '/api/dashboard') {
        const user = await getAuthenticatedUser(request)
        if (!user) return sendJson(response, 401, { error: 'Authentication required.' })
        const enrichedUser = { ...user, skillDna: user.skillDna || SkillDnaEngine.calculateSkillDna({ claimedSkills: (user.skills || []).map((name, index) => ({ id: `${user.id}-${index}`, name, level: 5 })) }) }
        return sendJson(response, 200, defaultUserStats(enrichedUser))
    }

    if (request.method === 'GET' && request.url === '/api/matches') {
        try {
            const result = await handleMatches(request)
            return sendJson(response, result.status, result.body)
        } catch (error) {
            return sendJson(response, 500, { error: 'Unable to load matches.', details: error.message })
        }
    }

    if (request.method === 'POST' && request.url === '/api/swipes') {
        try {
            const result = await handleSwipe(request)
            return sendJson(response, result.status, result.body)
        } catch {
            return sendJson(response, 400, { error: 'Invalid swipe request.' })
        }
    }

    if (request.method === 'POST' && request.url === '/api/skill-chains/accept') {
        try {
            const result = await handleChainAccept(request)
            return sendJson(response, result.status, result.body)
        } catch {
            return sendJson(response, 400, { error: 'Invalid chain request.' })
        }
    }

    if (request.method === 'PUT' && /^\/api\/users\/[^/]+$/.test(request.url)) {
        const userId = request.url.split('/').pop()
        const authenticatedUserId = authenticate(request)
        if (!authenticatedUserId || authenticatedUserId !== userId) return sendJson(response, 401, { error: 'Authentication required.' })
        try {
            const result = await handleProfileUpdate(request, userId)
            return sendJson(response, result.status, result.body)
        } catch {
            return sendJson(response, 400, { error: 'Invalid profile request.' })
        }
    }

    if (request.method === 'POST' && request.url === '/api/auth/register') {
        try {
            const result = await handleRegister(request)
            return sendJson(response, result.status, result.body)
        } catch {
            return sendJson(response, 400, { error: 'Invalid JSON request.' })
        }
    }

    if (request.method === 'POST' && request.url === '/api/auth/login') {
        try {
            const result = await handleLogin(request)
            return sendJson(response, result.status, result.body)
        } catch {
            return sendJson(response, 400, { error: 'Invalid JSON request.' })
        }
    }

    if (request.method === 'POST' && request.url === '/api/contact') {
        try {
            const result = await createContact(request)
            return sendJson(response, result.error ? 400 : 201, result)
        } catch {
            return sendJson(response, 400, { error: 'Invalid JSON request.' })
        }
    }

    if (request.method === 'POST' && request.url === '/api/ai') {
        try {
            const rawBody = await readRequestBody(request)
            const result = await handleAiChat({ ...request, body: rawBody }, process.env)
            return sendJson(response, result.status, result.body)
        } catch (error) {
            return sendJson(response, 500, { error: 'AI request failed.', details: error.message })
        }
    }

    return sendJson(response, 404, { error: 'Route not found' })
})

const port = Number(process.env.PORT || 4000)

module.exports = { handleAiChat }

if (require.main === module) {
    server.listen(port, () => console.log(`SkillSwap backend listening on http://localhost:${port}`))
}

async function getAuthenticatedUser(request) {
    const userId = authenticate(request)
    if (!userId) return null
    const users = await getUsers()
    return users.find((user) => user.id === userId) || null
}

function toMatchingUser(user) {
    const skillDna = user.skillDna || (user.skills || []).map((name, index) => ({ name, level: 5, confidence: 100, id: `${user.id}-${index}` }))
    return {
        ...user,
        skillDna,
        skills_learning: user.lookingFor || [],
        goals: user.goals || [],
        interests: user.interests || [],
        hobbies: user.hobbies || [],
        availability: user.availability || [],
        reputation_score: Number(user.reputation_score || 0),
    }
}

async function handleProfileUpdate(request, userId) {
    const body = parseJsonBody(await readRequestBody(request))
    const users = await getUsers()
    const index = users.findIndex((user) => user.id === userId)
    if (index < 0) return { status: 404, body: { error: 'User not found.' } }

    const current = users[index]
    const skills = Array.isArray(body.skills) ? body.skills.map(String).map((skill) => skill.trim()).filter(Boolean) : current.skills || []
    const lookingFor = Array.isArray(body.lookingFor) ? body.lookingFor.map(String).map((skill) => skill.trim()).filter(Boolean) : current.lookingFor || []
    users[index] = {
        ...current,
        name: String(body.name || current.name).trim(),
        bio: String(body.bio ?? current.bio ?? '').trim(),
        skills,
        lookingFor,
        skillDna: skills.map((name, skillIndex) => ({ name, level: 5, confidence: 100, id: `${userId}-${skillIndex}` })),
    }
    await saveUsers(users)
    return { status: 200, body: publicUser(users[index]) }
}

async function handleMatches(request) {
    const currentUser = await getAuthenticatedUser(request)
    if (!currentUser) return { status: 401, body: { error: 'Authentication required.' } }
    const users = await getUsers()
    const matchingUsers = users.map(toMatchingUser)
    const currentMatchingUser = toMatchingUser(currentUser)
    return {
        status: 200,
        body: {
            matches: AiMatchingEngine.findDirectMatches(currentMatchingUser, matchingUsers),
            skillChains: AiMatchingEngine.findSkillChains(currentMatchingUser, matchingUsers).map((chain, index) => ({ ...chain, id: `chain-${currentUser.id}-${index}` })),
        },
    }
}

async function handleSwipe(request) {
    const currentUser = await getAuthenticatedUser(request)
    if (!currentUser) return { status: 401, body: { error: 'Authentication required.' } }
    const body = parseJsonBody(await readRequestBody(request))
    if (!body.targetUserId || !['like', 'pass'].includes(body.action)) return { status: 400, body: { error: 'Target user and action are required.' } }
    return { status: 200, body: { ok: true, matched: body.action === 'like', userId: currentUser.id } }
}

async function handleChainAccept(request) {
    const currentUser = await getAuthenticatedUser(request)
    if (!currentUser) return { status: 401, body: { error: 'Authentication required.' } }
    const body = parseJsonBody(await readRequestBody(request))
    if (!body.chainId) return { status: 400, body: { error: 'Chain id is required.' } }
    return { status: 200, body: { ok: true, chainId: body.chainId } }
}