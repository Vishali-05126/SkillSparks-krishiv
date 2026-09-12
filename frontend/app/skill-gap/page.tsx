'use client'

import { FormEvent, useState } from 'react'

type Gap = { skill: string; priority: string; reason: string; estimatedHours?: number }

export default function SkillGapPage() {
    const [goal, setGoal] = useState('')
    const [skills, setSkills] = useState('')
    const [gaps, setGaps] = useState<Gap[]>([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    async function submit(event: FormEvent) { event.preventDefault(); setLoading(true); setMessage('Analyzing your stated goal…'); try { const response = await fetch('/api/skill-gap', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goal, currentSkills: skills.split(',').map((value) => value.trim()).filter(Boolean) }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); setGaps(result.missingSkills || []); setMessage(result.message || '') } catch (cause: any) { setMessage(cause.message || 'Unable to analyze this goal.') } finally { setLoading(false) } }
    return <main className="section app-page"><div className="page-intro"><p className="eyebrow">AI skill gap detector</p><h1>See what gets<br /><span>you there.</span></h1><p className="lede">Tell us where you want to go and what you already know. We will turn the distance into a practical next list.</p></div><div className="app-grid"><form className="surface compose-form" onSubmit={submit}><div className="surface-heading"><h2>Map your next move</h2><span>AI</span></div><input required value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="Target role or skill" /><textarea value={skills} onChange={(event) => setSkills(event.target.value)} placeholder="Current skills, comma-separated" /><button className="button button-orange" type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Analyze gap'} <span>→</span></button>{message && <p className="state">{message}</p>}</form><div className="feed-list">{gaps.map((gap) => <article className="surface post-card" key={gap.skill}><div className="post-meta"><strong>{gap.skill}</strong><span>{gap.priority}{gap.estimatedHours ? ` · ~${gap.estimatedHours}h` : ''}</span></div><p>{gap.reason}</p><a className="text-link" href={`/discover?skill=${encodeURIComponent(gap.skill)}`}>Find a mentor <span>→</span></a></article>)}{!gaps.length && <div className="surface empty-state"><strong>Your checklist will appear here</strong><span>Use your exact target role and current skills for a focused, profile-aware roadmap.</span></div>}</div></div></main>
}
