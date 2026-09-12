'use client'

import { useEffect, useState } from 'react'

type Room = { id: string; topic: string; description?: string | null; _count: { messages: number } }

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([])
    const [error, setError] = useState('')
    useEffect(() => { fetch('/api/rooms').then(async (response) => { const result = await response.json(); setRooms(result.rooms || []); setError(result.error || '') }) }, [])
    return <main className="section app-page"><div className="page-intro"><p className="eyebrow">Topic rooms</p><h1>Find your<br /><span>corner.</span></h1><p className="lede">Persistent group conversations for focused questions, feedback, and friendly accountability.</p></div>{error && <p className="state">{error}</p>}<div className="project-grid">{rooms.map((room) => <a className="project-card" href={`/rooms/${encodeURIComponent(room.topic)}`} key={room.id}><span className="status">{room._count.messages} messages</span><h3>{room.topic}</h3><p>{room.description}</p><span className="text-link">Enter room <span>→</span></span></a>)}</div>{!rooms.length && !error && <div className="empty-state"><strong>No rooms yet</strong><span>Run the Prisma seed to create the starter rooms.</span></div>}</main>
}
