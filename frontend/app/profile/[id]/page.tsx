'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

type Profile = Record<string, any>

export default function PublicProfilePage({ params }: { params: { id: string } }) {
    const { data: session } = useSession()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [connection, setConnection] = useState<Profile | null>(null)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [connecting, setConnecting] = useState(false)

    useEffect(() => { fetch(`/api/profile/${params.id}`).then(async (response) => { const result = await response.json(); if (!response.ok) throw new Error(result.error); setProfile(result.user) }).catch((reason) => setError(reason.message || 'Profile unavailable.')) }, [params.id])
    useEffect(() => { if (!session?.user?.id || session.user.id === params.id) return; fetch(`/api/connections?userId=${params.id}`).then(async (response) => { if (response.ok) { const result = await response.json(); setConnection(result.request || null) } }) }, [params.id, session?.user?.id])

    async function sendConnection() {
        if (!profile) return
        setConnecting(true); setError('')
        try { const response = await fetch('/api/connections', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ recipientId: profile.id, message }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); setConnection(result.request) } catch (reason: any) { setError(reason.message || 'Unable to send connection request.') } finally { setConnecting(false) }
    }

    if (error && !profile) return <main className="section app-page"><p className="state error">{error}</p></main>
    if (!profile) return <main className="section app-page"><p className="state">Loading public profile...</p></main>
    const ownProfile = session?.user?.id === profile.id
    const requestText = connection?.status === 'PENDING' ? (connection.senderId === session?.user?.id ? 'Request sent' : 'Connection request pending') : connection?.status === 'ACCEPTED' ? 'Connected' : connection?.status

    return <main className="section app-page public-profile">
        <div className="profile-cover" style={{ backgroundImage: profile.coverUrl ? `url(${profile.coverUrl})` : undefined }}><div className="profile-avatar large">{profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} /> : profile.name?.charAt(0)}</div></div>
        <div className="public-profile-heading"><p className="eyebrow">Get to know me</p><h1>{profile.name}</h1><p className="lede">{profile.headline || profile.bio}</p><p className="profile-location">{[profile.city, profile.country].filter(Boolean).join(', ')}</p>
            {!ownProfile && <div className="connection-cta">{connection ? <span className="connection-status">{requestText}</span> : <><input value={message} maxLength={500} onChange={(event) => setMessage(event.target.value)} placeholder={`Hi ${profile.name.split(' ')[0]}, I would love to connect…`} /><button className="button button-orange" onClick={sendConnection} disabled={connecting}>{connecting ? 'Sending…' : 'Connect'} <span>→</span></button></>}<a className="button button-dark" href="/sessions">Book session <span>→</span></a></div>}
            {error && <p className="error-message">{error}</p>}
        </div>
        <div className="public-profile-grid"><section className="surface"><h2>Skills I have</h2><div className="chip-preview">{(profile.skills || []).map((skill: string) => <span key={skill}>{skill}</span>)}</div></section><section className="surface"><h2>Skills I want</h2><div className="chip-preview">{(profile.lookingFor || []).map((skill: string) => <span key={skill}>{skill}</span>)}</div></section><section className="surface get-to-know"><h2>Get to know me</h2><Info label="Personality" value={profile.personalityType} /><Info label="Social style" value={profile.socialStyle} /><Info label="Learning style" value={profile.learnerType} /><Info label="Hobbies" value={(profile.hobbies || []).join(', ')} /></section><section className="surface"><h2>About</h2><p>{profile.bio || 'This person has not added a bio yet.'}</p></section></div>
    </main>
}

function Info({ label, value }: { label: string; value?: string }) { return <div className="profile-info-row"><span>{label}</span><strong>{value || 'Not added yet'}</strong></div> }
