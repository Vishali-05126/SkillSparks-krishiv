import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { localRooms } from '@/lib/localContent'

export async function GET(_request: Request, { params }: { params: { topic: string } }) {
    try {
        const room = await prisma.room.findUnique({ where: { topic: decodeURIComponent(params.topic) }, include: { messages: { include: { user: { select: { name: true } } }, orderBy: { createdAt: 'asc' }, take: 100 } } })
        if (!room) return NextResponse.json({ error: 'Room not found.' }, { status: 404 })
        return NextResponse.json({ room })
    } catch {
        const topic = decodeURIComponent(params.topic)
        const room = localRooms.find((candidate) => candidate.topic === topic)
        if (!room) return NextResponse.json({ error: 'Room not found.' }, { status: 404 })
        return NextResponse.json({ room: { ...room, messages: [] }, localFallback: true })
    }
}
