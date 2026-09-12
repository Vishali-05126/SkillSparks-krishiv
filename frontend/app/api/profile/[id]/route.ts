import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { readLocalUsers } from '@/lib/localUsers'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const user = await prisma.user.findUnique({ where: { id: params.id }, include: { skillsHave: { include: { skill: true } }, skillsWant: { include: { skill: true } }, hobbies: true, posts: { orderBy: { createdAt: 'desc' }, take: 12 }, proofs: { where: { verified: true } } } })
        if (!user) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })
        return NextResponse.json({ user: { ...user, passwordHash: undefined, skills: user.skillsHave.map(({ skill }) => skill.name), lookingFor: user.skillsWant.map(({ skill }) => skill.name), hobbies: user.hobbies.map(({ name }) => name) } })
    } catch {
        const user = readLocalUsers().find((candidate) => candidate.id === params.id)
        if (!user) return NextResponse.json({ error: 'Profile not found.' }, { status: 404 })
        const { password, passwordHash, ...publicUser } = user
        return NextResponse.json({ user: publicUser })
    }
}
