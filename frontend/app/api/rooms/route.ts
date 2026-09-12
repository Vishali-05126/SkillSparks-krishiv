import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { localRooms } from '@/lib/localContent'

export async function GET() {
    try { return NextResponse.json({ rooms: await prisma.room.findMany({ include: { _count: { select: { messages: true } } }, orderBy: { topic: 'asc' } }) }) } catch { return NextResponse.json({ rooms: localRooms, localFallback: true }) }
}
