import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { localTeams } from '@/lib/localContent'

export async function GET() {
    try { return NextResponse.json({ teams: await prisma.team.findMany({ include: { createdBy: { select: { name: true } }, members: true }, orderBy: { createdAt: 'desc' } }) }) } catch { return NextResponse.json({ teams: localTeams, localFallback: true }) }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const body = await request.json()
    const projectTopic = String(body.projectTopic || '').trim()
    const roles = Array.isArray(body.roles) ? body.roles.map(String).map((role: string) => role.trim()).filter(Boolean) : []
    if (!projectTopic || !roles.length) return NextResponse.json({ error: 'Project topic and at least one role are required.' }, { status: 400 })
    try {
        const team = await prisma.team.create({ data: { projectTopic, createdById: session.user.id, members: { create: roles.map((role: string) => ({ userId: session.user.id, roleNeeded: role })) } } })
        return NextResponse.json({ team }, { status: 201 })
    } catch {
        const team = { id: `local-team-${Date.now()}`, projectTopic, createdBy: { name: session.user.name || 'You' }, members: roles.map((role: string) => ({ roleNeeded: role })) }
        localTeams.unshift(team)
        return NextResponse.json({ team, localFallback: true }, { status: 201 })
    }
}
