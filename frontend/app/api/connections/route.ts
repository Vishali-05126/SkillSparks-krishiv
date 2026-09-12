import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { readLocalUsers, publicLocalUser } from '@/lib/localUsers'
import { readLocalConnections, writeLocalConnections } from '@/lib/localConnections'

const publicPerson = (user: Record<string, any>) => ({ id: user.id, name: user.name, headline: user.headline || '', avatarUrl: user.avatarUrl || '', city: user.city || '', skills: user.skills || [] })

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const targetId = new URL(request.url).searchParams.get('userId')
    const where = targetId ? { OR: [{ senderId: session.user.id, recipientId: targetId }, { senderId: targetId, recipientId: session.user.id }] } : { OR: [{ senderId: session.user.id }, { recipientId: session.user.id }] }
    try {
        const requests = await prisma.connectionRequest.findMany({
            where,
            include: { sender: { select: { id: true, name: true, headline: true, avatarUrl: true, city: true, skillsHave: { include: { skill: true } } } }, recipient: { select: { id: true, name: true, headline: true, avatarUrl: true, city: true, skillsHave: { include: { skill: true } } } } },
            orderBy: { createdAt: 'desc' },
        })
        const shaped = requests.map((item) => ({ ...item, sender: { ...item.sender, skills: item.sender.skillsHave.map(({ skill }) => skill.name) }, recipient: { ...item.recipient, skills: item.recipient.skillsHave.map(({ skill }) => skill.name) } }))
        return NextResponse.json({ requests: shaped, request: targetId ? shaped[0] || null : undefined })
    } catch {
        const users = readLocalUsers()
        const requests = readLocalConnections().filter((item) => targetId ? (item.senderId === session.user!.id && item.recipientId === targetId) || (item.senderId === targetId && item.recipientId === session.user!.id) : item.senderId === session.user!.id || item.recipientId === session.user!.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((item) => ({ ...item, sender: publicPerson(publicLocalUser(users.find((user) => user.id === item.senderId) || { id: item.senderId, name: 'Unknown member', email: '' })), recipient: publicPerson(publicLocalUser(users.find((user) => user.id === item.recipientId) || { id: item.recipientId, name: 'Unknown member', email: '' })) }))
        return NextResponse.json({ requests, request: targetId ? requests[0] || null : undefined, localFallback: true })
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const body = await request.json().catch(() => ({}))
    const recipientId = String(body.recipientId || '').trim()
    const message = String(body.message || '').trim().slice(0, 500)
    if (!recipientId || recipientId === session.user.id) return NextResponse.json({ error: 'Choose another member to connect with.' }, { status: 400 })
    const duplicateWhere = { OR: [{ senderId: session.user.id, recipientId }, { senderId: recipientId, recipientId: session.user.id }] }
    try {
        const recipient = await prisma.user.findUnique({ where: { id: recipientId }, select: { id: true } })
        if (!recipient) return NextResponse.json({ error: 'Member not found.' }, { status: 404 })
        const existing = await prisma.connectionRequest.findFirst({ where: duplicateWhere })
        if (existing) return NextResponse.json({ error: 'A connection request already exists for this member.', request: existing }, { status: 409 })
        const created = await prisma.connectionRequest.create({ data: { senderId: session.user.id, recipientId, message: message || null } })
        return NextResponse.json({ request: created }, { status: 201 })
    } catch {
        const users = readLocalUsers()
        if (!users.some((user) => user.id === recipientId)) return NextResponse.json({ error: 'Member not found.' }, { status: 404 })
        const connections = readLocalConnections()
        const existing = connections.find((item) => (item.senderId === session.user!.id && item.recipientId === recipientId) || (item.senderId === recipientId && item.recipientId === session.user!.id))
        if (existing) return NextResponse.json({ error: 'A connection request already exists for this member.', request: existing }, { status: 409 })
        const created = { id: `connection_${Date.now()}`, senderId: session.user.id, recipientId, message, status: 'PENDING' as const, createdAt: new Date().toISOString() }
        connections.push(created); writeLocalConnections(connections)
        return NextResponse.json({ request: created, localFallback: true }, { status: 201 })
    }
}
