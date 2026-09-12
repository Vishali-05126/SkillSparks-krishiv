import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { readLocalUsers } from '@/lib/localUsers'
import { askAi } from '@/lib/ai'

type CoachProfile = { name: string; skills: string[]; lookingFor: string[]; interests: string[] }

function fallbackReply(message: string, profile: CoachProfile) {
    const prompt = message.toLowerCase()
    const learns = profile.lookingFor.length ? profile.lookingFor.slice(0, 3).join(', ') : 'a skill you want to learn'
    const offers = profile.skills.length ? profile.skills.slice(0, 3).join(', ') : 'a skill you can offer'
    if (prompt.includes('message') || prompt.includes('reach') || prompt.includes('intro')) return `Try this: “Hi! I noticed you can help with ${learns}. I can share ${offers} in return. Would you be open to a short 20-minute skill swap this week?” Keep the first ask specific and easy to accept.`
    if (prompt.includes('match') || prompt.includes('who') || prompt.includes('find')) return `I rank people highest when their teachable skills overlap with ${learns} and your ${offers} can help them back. Add your interests and availability in your profile too — it gives me better tie-breakers when several people fit.`
    if (prompt.includes('learn') || prompt.includes('plan') || prompt.includes('start')) return `Start with one concrete outcome for ${learns}: pick a small project or a 30-minute lesson goal. Then use your strongest skill, ${offers}, as the exchange value. Small, reciprocal first sessions lead to better matches.`
    return `Based on your profile, I would focus your next swap on learning ${learns} while offering ${offers}. Ask a potential match for one practical outcome, then agree on a short first session before planning a longer exchange.`
}

async function loadProfile(userId: string): Promise<CoachProfile | null> {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId }, include: { skillsHave: { include: { skill: true } }, skillsWant: { include: { skill: true } } } })
        if (!user) return null
        return { name: user.name, skills: user.skillsHave.map(({ skill }) => skill.name), lookingFor: user.skillsWant.map(({ skill }) => skill.name), interests: user.interests }
    } catch {
        const user = readLocalUsers().find((candidate) => candidate.id === userId)
        if (!user) return null
        return { name: user.name, skills: Array.isArray(user.skills) ? user.skills.map(String) : [], lookingFor: Array.isArray(user.lookingFor) ? user.lookingFor.map(String) : [], interests: Array.isArray(user.interests) ? user.interests.map(String) : [] }
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const { message } = await request.json().catch(() => ({}))
    const question = String(message || '').trim().slice(0, 600)
    if (!question) return NextResponse.json({ error: 'Ask your coach a question.' }, { status: 400 })
    const profile = await loadProfile(session.user.id)
    if (!profile) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })

    const result = await askAi([{ role: 'system', content: `You are SkillSwap AI Coach. Give concise, practical peer-learning advice based ONLY on this profile: can teach ${profile.skills.join(', ') || 'not set'}; wants to learn ${profile.lookingFor.join(', ') || 'not set'}; interests ${profile.interests.join(', ') || 'not set'}. Do not invent members, meetings, skills, pricing, outcomes, or claims that you contacted someone. If information is absent, say what to add to the profile. Do not present advice as a guarantee.` }, { role: 'user', content: question }], { maxTokens: 220 })
    if (result) return NextResponse.json({ reply: result.text, engine: result.provider })
    return NextResponse.json({ reply: fallbackReply(question, profile), engine: 'profile-coach' })
}
