import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { readLocalConnections, writeLocalConnections } from '@/lib/localConnections'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const body = await request.json().catch(() => ({}))
    const action = String(body.action || '').toLowerCase()
    if (!['accept', 'reject', 'cancel'].includes(action)) return NextResponse.json({ error: 'Choose accept, reject, or cancel.' }, { status: 400 })

    try {
        const connection = await prisma.connectionRequest.findUnique({ where: { id: params.id } })
        if (!connection) return NextResponse.json({ error: 'Connection request not found.' }, { status: 404 })
        const receiverAction = action === 'accept' || action === 'reject'
        if ((receiverAction && connection.recipientId !== session.user.id) || (action === 'cancel' && connection.senderId !== session.user.id) || connection.status !== 'PENDING') return NextResponse.json({ error: 'This request can no longer be updated.' }, { status: 403 })
        const status = action === 'accept' ? 'ACCEPTED' : action === 'reject' ? 'REJECTED' : 'CANCELLED'
        const updated = await prisma.connectionRequest.update({ where: { id: params.id }, data: { status, respondedAt: new Date() } })
        return NextResponse.json({ request: updated })
    } catch {
        const connections = readLocalConnections()
        const index = connections.findIndex((connection) => connection.id === params.id)
        if (index < 0) return NextResponse.json({ error: 'Connection request not found.' }, { status: 404 })
        const connection = connections[index]
        const receiverAction = action === 'accept' || action === 'reject'
        if ((receiverAction && connection.recipientId !== session.user.id) || (action === 'cancel' && connection.senderId !== session.user.id) || connection.status !== 'PENDING') return NextResponse.json({ error: 'This request can no longer be updated.' }, { status: 403 })
        connections[index] = { ...connection, status: action === 'accept' ? 'ACCEPTED' : action === 'reject' ? 'REJECTED' : 'CANCELLED', respondedAt: new Date().toISOString() }
        writeLocalConnections(connections)
        return NextResponse.json({ request: connections[index], localFallback: true })
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    try {
        const connection = await prisma.connectionRequest.findUnique({ where: { id: params.id } })
        if (!connection) return NextResponse.json({ error: 'Connection not found.' }, { status: 404 })
        if (connection.status !== 'ACCEPTED' || (connection.senderId !== session.user.id && connection.recipientId !== session.user.id)) return NextResponse.json({ error: 'Only an accepted connection can be removed.' }, { status: 403 })
        await prisma.connectionRequest.delete({ where: { id: params.id } })
        return NextResponse.json({ ok: true })
    } catch {
        const connections = readLocalConnections()
        const connection = connections.find((item) => item.id === params.id)
        if (!connection || connection.status !== 'ACCEPTED' || (connection.senderId !== session.user.id && connection.recipientId !== session.user.id)) return NextResponse.json({ error: 'Only an accepted connection can be removed.' }, { status: 403 })
        writeLocalConnections(connections.filter((item) => item.id !== params.id))
        return NextResponse.json({ ok: true, localFallback: true })
    }
}
