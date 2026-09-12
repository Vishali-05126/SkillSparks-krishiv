'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'

type RequestItem = { id: string; senderId: string; recipientId: string; message?: string; status: string; createdAt: string; sender: { id: string; name: string; headline?: string; avatarUrl?: string; skills?: string[] }; recipient: { id: string; name: string; headline?: string; avatarUrl?: string; skills?: string[] } }

export default function ConnectionsPage() {
    const { data: session } = useSession()
    const [requests, setRequests] = useState<RequestItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [workingId, setWorkingId] = useState('')

    async function load() {
        setLoading(true)
        try { const response = await fetch('/api/connections'); const result = await response.json(); if (response.status === 401) { window.location.href = '/login'; return }; if (!response.ok) throw new Error(result.error); setRequests(result.requests || []) } catch (reason: any) { setError(reason.message || 'Unable to load connections.') } finally { setLoading(false) }
    }
    useEffect(() => { load() }, [])
    async function update(request: RequestItem, action: 'accept' | 'reject' | 'cancel' | 'remove') {
        setWorkingId(request.id); setError('')
        try { const response = await fetch(`/api/connections/${request.id}`, { method: action === 'remove' ? 'DELETE' : 'PATCH', headers: action === 'remove' ? undefined : { 'Content-Type': 'application/json' }, body: action === 'remove' ? undefined : JSON.stringify({ action }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); await load() } catch (reason: any) { setError(reason.message || 'Unable to update connection.') } finally { setWorkingId('') }
    }
    const incoming = useMemo(() => requests.filter((item) => item.status === 'PENDING' && item.recipientId === session?.user?.id), [requests, session?.user?.id])
    const sent = useMemo(() => requests.filter((item) => item.status === 'PENDING' && !incoming.includes(item)), [requests, incoming])
    const accepted = useMemo(() => requests.filter((item) => item.status === 'ACCEPTED'), [requests])
    if (loading) return <main className="connections-page"><p>Loading your professional circle…</p></main>
    return <main className="connections-page"><section className="connections-intro"><p className="coach-kicker">Your network</p><h1>Build your learning <em>circle.</em></h1><p>Connections unlock chat, skill-swap proposals, and session scheduling.</p></section>{error && <p className="error-message">{error}</p>}<ConnectionSection title="Requests for you" empty="No pending invitations right now." requests={incoming} mode="incoming" workingId={workingId} onUpdate={update} /><ConnectionSection title="Requests you sent" empty="Explore profiles and make the first move." requests={sent} mode="sent" workingId={workingId} onUpdate={update} /><ConnectionSection title="Your connections" empty="Accepted connections will appear here." requests={accepted} mode="accepted" workingId={workingId} onUpdate={update} /></main>
}

function ConnectionSection({ title, empty, requests, mode, workingId, onUpdate }: { title: string; empty: string; requests: RequestItem[]; mode: 'incoming' | 'sent' | 'accepted'; workingId: string; onUpdate: (request: RequestItem, action: 'accept' | 'reject' | 'cancel' | 'remove') => void }) {
    return <section className="connection-section"><div className="coach-section-heading"><h2>{title}</h2><span>{requests.length}</span></div>{requests.length ? <div className="connection-grid">{requests.map((request) => { const member = mode === 'incoming' ? request.sender : request.recipient; const working = workingId === request.id; return <article className="connection-card" key={request.id}><div className="connection-avatar">{member.avatarUrl ? <img src={member.avatarUrl} alt="" /> : member.name.charAt(0)}</div><div><h3>{member.name}</h3><p>{member.headline || 'SkillSwap member'}</p></div>{request.message && <blockquote>“{request.message}”</blockquote>}<div className="chip-preview">{(member.skills || []).slice(0, 3).map((skill) => <span key={skill}>{skill}</span>)}</div><div className="connection-actions"><a href={`/profile/${member.id}`}>View profile</a>{mode === 'incoming' && <><button disabled={working} onClick={() => onUpdate(request, 'reject')}>Decline</button><button className="connection-accept" disabled={working} onClick={() => onUpdate(request, 'accept')}>{working ? 'Saving…' : 'Accept'}</button></>}{mode === 'sent' && <button disabled={working} onClick={() => onUpdate(request, 'cancel')}>{working ? 'Cancelling…' : 'Cancel request'}</button>}{mode === 'accepted' && <button disabled={working} onClick={() => onUpdate(request, 'remove')}>{working ? 'Removing…' : 'Remove'}</button>}</div></article> })}</div> : <div className="connection-empty">{empty}</div>}</section>
}
