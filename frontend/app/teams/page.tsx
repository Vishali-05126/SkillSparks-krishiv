'use client'

import { FormEvent, useEffect, useState } from 'react'

type Team = { id: string; projectTopic: string; createdBy: { name: string }; members: { roleNeeded: string }[] }

export default function TeamsPage() {
    const [teams, setTeams] = useState<Team[]>([])
    const [topic, setTopic] = useState('')
    const [roles, setRoles] = useState('')
    const [message, setMessage] = useState('')
    async function load() { const result = await (await fetch('/api/teams')).json(); setTeams(result.teams || []); setMessage(result.error || '') }
    useEffect(() => { load() }, [])
    async function createTeam(event: FormEvent) { event.preventDefault(); const response = await fetch('/api/teams', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ projectTopic: topic, roles: roles.split(',') }) }); const result = await response.json(); setMessage(result.error || 'Team created.'); if (response.ok) { setTopic(''); setRoles(''); await load() } }
    return <main className="section app-page"><div className="page-intro"><p className="eyebrow">Build together</p><h1>Good work<br /><span>needs company.</span></h1><p className="lede">Create a team around a real project, then find people whose skills complete the picture.</p></div><div className="app-grid"><form className="surface compose-form" onSubmit={createTeam}><div className="surface-heading"><h2>Create a team</h2><span>01</span></div><input required value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Project topic" /><input required value={roles} onChange={(event) => setRoles(event.target.value)} placeholder="Roles needed, comma-separated" /><button className="button button-orange" type="submit">Open team <span>→</span></button>{message && <p className="state">{message}</p>}</form><div className="feed-list"><div className="feed-toolbar"><h2>Open teams</h2></div>{teams.map((team) => <article className="surface post-card" key={team.id}><div className="post-meta"><strong>{team.projectTopic}</strong><span>Open</span></div><p>Created by {team.createdBy.name}</p><div className="tags">{team.members.map((member, index) => <span key={`${member.roleNeeded}-${index}`}>{member.roleNeeded}</span>)}</div></article>)}{!teams.length && <div className="surface empty-state"><strong>No open teams yet</strong><span>Start one around the project you want to build.</span></div>}</div></div></main>
}
