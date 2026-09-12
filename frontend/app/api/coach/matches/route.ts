import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { readLocalUsers, publicLocalUser } from '@/lib/localUsers'

type CoachUser = {
    id: string
    name: string
    headline?: string | null
    bio?: string | null
    avatarUrl?: string | null
    city?: string | null
    skills: string[]
    lookingFor: string[]
    interests: string[]
    hobbies: string[]
}

const clean = (value: string) => value.trim().toLowerCase()
const overlap = (left: string[], right: string[]) => left.filter((item) => right.some((other) => clean(item) === clean(other)))

function coachMatch(me: CoachUser, person: CoachUser) {
    const theyTeach = overlap(person.skills, me.lookingFor)
    const youTeach = overlap(me.skills, person.lookingFor)
    const sharedInterests = overlap(me.interests, person.interests)
    const sharedHobbies = overlap(me.hobbies, person.hobbies)
    const sameCity = Boolean(me.city && person.city && clean(me.city) === clean(person.city))

    const score = Math.min(99, 45 + Math.min(28, theyTeach.length * 18) + Math.min(16, youTeach.length * 10) + Math.min(7, sharedInterests.length * 4) + Math.min(4, sharedHobbies.length * 2) + (sameCity ? 4 : 0))
    const reasons = [
        theyTeach.length ? `Can help you learn ${theyTeach.slice(0, 2).join(' and ')}` : '',
        youTeach.length ? `You can offer ${youTeach.slice(0, 2).join(' and ')}` : '',
        sharedInterests.length ? `Shared interest: ${sharedInterests.slice(0, 2).join(', ')}` : '',
        sameCity ? `Also based in ${person.city}` : '',
    ].filter(Boolean)

    return { ...person, score, theyTeach, youTeach, sharedInterests, reason: reasons.join('. ') }
}

function buildCoaching(user: CoachUser, matchCount: number) {
    if (!user.skills.length && !user.lookingFor.length) {
        return { title: 'Complete your skill signal', message: 'Add what you can teach and what you want to learn. Your coach will then find reciprocal matches built around a real exchange.', action: 'Complete profile', href: '/profile' }
    }
    if (!user.lookingFor.length) {
        return { title: 'Name your next learning goal', message: 'Tell your coach one skill you want to learn so it can find people who can genuinely help.', action: 'Add learning goals', href: '/profile' }
    }
    if (!user.skills.length) {
        return { title: 'Share a skill you can offer', message: 'Even one teachable skill makes your recommendations more useful and reciprocal.', action: 'Add skills', href: '/profile' }
    }
    if (!matchCount) {
        return { title: 'Your coach is ready to match', message: 'We could not find a reciprocal exchange yet. Broaden one learning goal or add interests to improve your next recommendations.', action: 'Improve profile', href: '/profile' }
    }
    return { title: 'Your strongest exchanges are ready', message: `I found ${matchCount} people whose goals and skills complement yours. Start with the top recommendation and lead with a specific learning goal.`, action: 'View matches', href: '#recommendations' }
}

function localCoachUser(user: Record<string, any>): CoachUser {
    return { id: String(user.id), name: String(user.name || 'SkillSwap member'), headline: String(user.headline || ''), bio: String(user.bio || ''), avatarUrl: String(user.avatarUrl || user.avatar_url || ''), city: String(user.city || ''), skills: Array.isArray(user.skills) ? user.skills.map(String) : [], lookingFor: Array.isArray(user.lookingFor) ? user.lookingFor.map(String) : [], interests: Array.isArray(user.interests) ? user.interests.map(String) : [], hobbies: Array.isArray(user.hobbies) ? user.hobbies.map(String) : [] }
}

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })

    let people: CoachUser[]
    try {
        const users = await prisma.user.findMany({ include: { skillsHave: { include: { skill: true } }, skillsWant: { include: { skill: true } }, hobbies: true } })
        people = users.map((user) => ({ id: user.id, name: user.name, headline: user.headline, bio: user.bio, avatarUrl: user.avatarUrl, city: user.city, skills: user.skillsHave.map(({ skill }) => skill.name), lookingFor: user.skillsWant.map(({ skill }) => skill.name), interests: user.interests, hobbies: user.hobbies.map(({ name }) => name) }))
    } catch {
        people = readLocalUsers().map((user) => localCoachUser(publicLocalUser(user)))
    }

    const currentUser = people.find((person) => person.id === session.user.id)
    if (!currentUser) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })
    const matches = people.filter((person) => person.id !== currentUser.id).map((person) => coachMatch(currentUser, person)).filter((match) => match.theyTeach.length || match.youTeach.length).sort((a, b) => b.score - a.score).slice(0, 6)

    return NextResponse.json({ coach: buildCoaching(currentUser, matches.length), profile: { name: currentUser.name, skills: currentUser.skills, lookingFor: currentUser.lookingFor }, matches })
}
