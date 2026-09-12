'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

type Profile = { [key: string]: any }
const tabs = ['Basic info', 'Skills', 'Hobbies', 'Your Type', 'Background', 'Social & privacy']

export default function ProfilePage() {
    const router = useRouter()
    const { status } = useSession()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [draft, setDraft] = useState<Profile | null>(null)
    const [tab, setTab] = useState('Basic info')
    const [message, setMessage] = useState('')
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (status === 'unauthenticated') router.push('/login')
        if (status !== 'authenticated') return
        fetch('/api/profile').then(async (response) => { const result = await response.json(); if (!response.ok) throw new Error(result.error); setProfile(result.user); setDraft(result.user) }).catch((error) => setMessage(error.message || 'Unable to load profile.'))
    }, [router, status])

    function update(field: string, value: any) { setDraft((current) => current ? { ...current, [field]: value } : current) }
    function setTags(field: string, value: string) { update(field, value.split(',').map((item) => item.trim()).filter(Boolean)) }
    async function save() { if (!draft) return; setSaving(true); setMessage(''); const response = await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft) }); const result = await response.json(); if (response.ok) { setProfile(result.user); setDraft(result.user); setMessage('Profile saved successfully.') } else setMessage(result.error || 'Unable to save profile.'); setSaving(false) }

    if (!profile || !draft) return <main className="section app-page"><p className="state">{message || 'Loading profile...'}</p></main>
    return <main className="section app-page profile-editor-page">
        <div className="profile-cover" style={{ backgroundImage: draft.coverUrl ? `url(${draft.coverUrl})` : undefined }}><div className="profile-avatar large">{draft.avatarUrl ? <img src={draft.avatarUrl} alt="Profile avatar" /> : draft.name?.charAt(0) || 'U'}</div></div>
        <div className="profile-editor-heading"><div><p className="eyebrow">Your public identity</p><h1>{draft.name}</h1><p className="lede">{draft.headline || 'Tell the community what makes your perspective useful.'}</p></div><div className="completion"><strong>{draft.profileCompletionPercent || 0}%</strong><span>profile complete</span><div><i style={{ width: `${draft.profileCompletionPercent || 0}%` }} /></div></div></div>
        <div className="profile-tabs">{tabs.map((item) => <button className={tab === item ? 'active' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</div>
        <section className="surface profile-panel">
            {tab === 'Basic info' && <div className="form-grid"><Field label="Full name" value={draft.name} onChange={(value) => update('name', value)} /><Field label="Headline / tagline" value={draft.headline} onChange={(value) => update('headline', value)} /><Field label="Avatar image URL" value={draft.avatarUrl} onChange={(value) => update('avatarUrl', value)} /><Field label="Cover image URL" value={draft.coverUrl} onChange={(value) => update('coverUrl', value)} /><Field label="City" value={draft.city} onChange={(value) => update('city', value)} /><Field label="Country" value={draft.country} onChange={(value) => update('country', value)} /><Field label="Languages" value={(draft.languages || []).join(', ')} onChange={(value) => setTags('languages', value)} /><label className="form-span">Bio<textarea value={draft.bio || ''} onChange={(event) => update('bio', event.target.value)} rows={6} /></label></div>}
            {tab === 'Skills' && <div className="form-grid"><Field label="Skills I have" value={(draft.skills || []).join(', ')} onChange={(value) => setTags('skills', value)} /><Field label="Skills I want" value={(draft.lookingFor || []).join(', ')} onChange={(value) => setTags('lookingFor', value)} /><label className="form-span">Interests<textarea value={(draft.interests || []).join(', ')} onChange={(event) => setTags('interests', event.target.value)} placeholder="Music, hiking, community building" /></label></div>}
            {tab === 'Hobbies' && <div className="form-grid"><label className="form-span">Hobbies <span className="field-hint">Casual things that help people get to know you.</span><textarea value={(draft.hobbies || []).join(', ')} onChange={(event) => setTags('hobbies', event.target.value)} placeholder="Photography, chess, gaming, cooking" /></label><div className="chip-preview form-span">{(draft.hobbies || []).map((hobby: string) => <span key={hobby}>{hobby}</span>)}</div></div>}
            {tab === 'Your Type' && <div className="type-grid"><TypeCard label="Personality type" value={draft.personalityType} options={['Reflective builder', 'Curious connector', 'Practical problem-solver', 'Playful explorer']} onChange={(value) => update('personalityType', value)} /><TypeCard label="Social style" value={draft.socialStyle} options={['One-to-one', 'Small groups', 'Big conversations', 'Async and thoughtful']} onChange={(value) => update('socialStyle', value)} /><TypeCard label="Learning style" value={draft.learnerType} options={['Hands-on practice', 'Visual examples', 'Conversation first', 'Structured steps']} onChange={(value) => update('learnerType', value)} /></div>}
            {tab === 'Background' && <div className="form-grid"><label className="form-span">Education<textarea value={JSON.stringify(draft.education || [], null, 2)} onChange={(event) => { try { update('education', JSON.parse(event.target.value)) } catch { /* keep editing raw JSON */ } }} rows={8} /></label><label className="form-span">Experience<textarea value={JSON.stringify(draft.experience || [], null, 2)} onChange={(event) => { try { update('experience', JSON.parse(event.target.value)) } catch { /* keep editing raw JSON */ } }} rows={8} /></label></div>}
            {tab === 'Social & privacy' && <div className="form-grid"><Field label="LinkedIn" value={draft.socialLinks?.linkedin} onChange={(value) => update('socialLinks', { ...(draft.socialLinks || {}), linkedin: value })} /><Field label="GitHub" value={draft.socialLinks?.github} onChange={(value) => update('socialLinks', { ...(draft.socialLinks || {}), github: value })} /><Field label="Portfolio" value={draft.socialLinks?.portfolio} onChange={(value) => update('socialLinks', { ...(draft.socialLinks || {}), portfolio: value })} /><Field label="Phone" value={draft.phone} onChange={(value) => update('phone', value)} /></div>}
            <div className="profile-actions"><button className="button button-orange" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save changes'} <span>→</span></button><button className="button button-dark" onClick={() => signOut({ callbackUrl: '/login' })}>Sign out</button>{message && <span className="state">{message}</span>}</div>
        </section>
    </main>
}

function Field({ label, value, onChange }: { label: string; value: any; onChange: (value: string) => void }) { return <label>{label}<input value={value || ''} onChange={(event) => onChange(event.target.value)} /></label> }
function TypeCard({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="type-card">{label}<select value={value || ''} onChange={(event) => onChange(event.target.value)}><option value="">Choose one</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label> }
