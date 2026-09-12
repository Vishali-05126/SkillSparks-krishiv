'use client'

import { FormEvent, useEffect, useState } from 'react'

type Message = { id: string; content: string; user: { name: string }; createdAt: string }

export default function RoomPage({ params }: { params: { topic: string } }) {
    const topic = decodeURIComponent(params.topic)
    const [messages, setMessages] = useState<Message[]>([])
    const [content, setContent] = useState('')
    const [status, setStatus] = useState('')
    useEffect(() => { fetch(`/api/rooms/${encodeURIComponent(topic)}`).then(async (response) => { const result = await response.json(); setMessages(result.room?.messages || []); setStatus(result.error || '') }) }, [topic])
    async function send(event: FormEvent) {
        event.preventDefault()
        const trimmed = content.trim()
        if (!trimmed) return
        setMessages((current) => [...current, { id: `local-message-${Date.now()}`, content: trimmed, user: { name: 'You' }, createdAt: new Date().toISOString() }])
        setContent('')
        setStatus('Message shared in this local room.')
    }
    return <main className="section app-page"><div className="page-intro"><p className="eyebrow">Live topic room</p><h1>{topic}<br /><span>in conversation.</span></h1></div><div className="surface room-window"><div className="room-messages">{messages.map((message) => <div className="room-message" key={message.id}><strong>{message.user.name}</strong><p>{message.content}</p></div>)}{!messages.length && <div className="empty-state"><strong>Start the conversation</strong><span>{status || 'No messages yet.'}</span></div>}</div><form className="room-compose" onSubmit={send}><input value={content} onChange={(event) => setContent(event.target.value)} placeholder="Share a question or useful link" /><button className="button button-orange" type="submit">Send <span>→</span></button></form></div></main>
}
