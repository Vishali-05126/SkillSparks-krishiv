import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { readLocalUsers, writeLocalUsers } from '@/lib/localUsers'

function calculateCompletion(user: Record<string, any>) {
    const values = [user.name, user.headline, user.bio, user.avatarUrl, user.city, user.country, user.languages, user.skills, user.lookingFor, user.education, user.experience, user.certifications, user.achievements, user.interests, user.hobbies, user.personalityType, user.socialStyle, user.learnerType, user.socialLinks]
    return Math.round((values.filter((value) => Array.isArray(value) ? value.length > 0 : Boolean(value)).length / values.length) * 100)
}

function shapeUser(user: Record<string, any>) {
    return {
        id: user.id, name: user.name, email: user.email, bio: user.bio || '', headline: user.headline || '', avatarUrl: user.avatarUrl || '', coverUrl: user.coverUrl || '',
        gender: user.gender || '', dateOfBirth: user.dateOfBirth || '', city: user.city || '', country: user.country || '', timezone: user.timezone || '', languages: user.languages || [], interests: user.interests || [], phone: user.phone || '', phoneVerified: Boolean(user.phoneVerified),
        skills: user.skills || [], lookingFor: user.lookingFor || [], hobbies: user.hobbies || [], education: user.education || [], experience: user.experience || [], certifications: user.certifications || [], achievements: user.achievements || [], personalityType: user.personalityType || '', socialStyle: user.socialStyle || '', learnerType: user.learnerType || '', mentorSettings: user.mentorSettings || { hourlyRate: '', currency: 'USD', mode: 'video', availability: '' }, socialLinks: user.socialLinks || {}, privacy: user.privacy || {}, profileCompletionPercent: user.profileCompletionPercent ?? calculateCompletion(user), proofs: user.proofs || [],
    }
}

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    try {
        const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { skillsHave: { include: { skill: true } }, skillsWant: { include: { skill: true } }, hobbies: true, proofs: true } })
        if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 })
        return NextResponse.json({ user: shapeUser({ ...user, skills: user.skillsHave.map(({ skill }) => skill.name), lookingFor: user.skillsWant.map(({ skill }) => skill.name), hobbies: user.hobbies.map(({ name }) => name) }) })
    } catch {
        const user = readLocalUsers().find((candidate) => candidate.id === session.user.id)
        if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 })
        return NextResponse.json({ user: shapeUser(user) })
    }
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const body = await request.json()
    const skills = Array.isArray(body.skills) ? body.skills.map(String).map((skill: string) => skill.trim()).filter(Boolean) : []
    const lookingFor = Array.isArray(body.lookingFor) ? body.lookingFor.map(String).map((skill: string) => skill.trim()).filter(Boolean) : []
    const payload = { ...body, skills, lookingFor, profileCompletionPercent: calculateCompletion({ ...body, skills, lookingFor }) }
    try {
        const allNames = Array.from(new Set([...skills, ...lookingFor]))
        const skillRecords = await Promise.all(allNames.map((name) => prisma.skill.upsert({ where: { name }, update: {}, create: { name } })))
        const skillByName = new Map(skillRecords.map((skill) => [skill.name, skill.id]))
        const user = await prisma.$transaction(async (tx) => {
            await tx.userSkillHave.deleteMany({ where: { userId: session.user.id } })
            await tx.userSkillWant.deleteMany({ where: { userId: session.user.id } })
            await tx.userSkillHave.createMany({ data: skills.map((name: string) => ({ userId: session.user.id, skillId: skillByName.get(name)!, proficiency: Number(body.skillLevels?.[name] || 3) })) })
            await tx.userSkillWant.createMany({ data: lookingFor.map((name: string) => ({ userId: session.user.id, skillId: skillByName.get(name)! })) })
            await tx.hobby.deleteMany({ where: { userId: session.user.id } })
            if (Array.isArray(body.hobbies) && body.hobbies.length) await tx.hobby.createMany({ data: body.hobbies.map((name: string) => ({ userId: session.user.id, name })) })
            return tx.user.update({ where: { id: session.user.id }, data: { name: String(body.name || '').trim(), bio: String(body.bio || '').trim(), headline: String(body.headline || '').trim(), avatarUrl: String(body.avatarUrl || '').trim() || null, coverUrl: String(body.coverUrl || '').trim() || null, gender: String(body.gender || '').trim() || null, dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null, city: String(body.city || '').trim() || null, country: String(body.country || '').trim() || null, timezone: String(body.timezone || '').trim() || null, languages: body.languages || [], interests: body.interests || [], personalityType: String(body.personalityType || '').trim() || null, socialStyle: String(body.socialStyle || '').trim() || null, learnerType: String(body.learnerType || '').trim() || null, phone: String(body.phone || '').trim() || null, education: body.education || [], experience: body.experience || [], certifications: body.certifications || [], achievements: body.achievements || [], mentorSettings: body.mentorSettings || {}, socialLinks: body.socialLinks || {}, privacy: body.privacy || {}, profileCompletionPercent: payload.profileCompletionPercent } })
        })
        return NextResponse.json({ user: shapeUser({ ...user, skills, lookingFor }) })
    } catch {
        const users = readLocalUsers()
        const index = users.findIndex((candidate) => candidate.id === session.user.id)
        if (index < 0) return NextResponse.json({ error: 'User not found.' }, { status: 404 })
        users[index] = { ...users[index], ...payload }
        writeLocalUsers(users)
        return NextResponse.json({ user: shapeUser(users[index]) })
    }
}
