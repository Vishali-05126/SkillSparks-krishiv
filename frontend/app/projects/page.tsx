'use client'

import { useEffect, useState } from 'react'

type Project = { id: string; title: string; description: string; level: string; resourceLinks: string[] }

export default function ProjectsPage() {
    const [level, setLevel] = useState('')
    const [projects, setProjects] = useState<Project[]>([])
    const [error, setError] = useState('')
    useEffect(() => { fetch(`/api/projects${level ? `?level=${level}` : ''}`).then(async (response) => { const result = await response.json(); setProjects(result.projects || []); setError(result.error || '') }) }, [level])
    return <main className="section app-page"><div className="page-intro"><p className="eyebrow">Build with others</p><h1>Projects with<br /><span>momentum.</span></h1><p className="lede">Small, useful projects are where skill swaps become real experience.</p></div><div className="filter-tabs">{['', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((option) => <button className={level === option ? 'active' : ''} key={option} onClick={() => setLevel(option)}>{option || 'All levels'}</button>)}</div>{error && <p className="state">{error}</p>}<div className="project-grid">{projects.map((project) => <article className="project-card" key={project.id}><span className="status">{project.level}</span><h3>{project.title}</h3><p>{project.description}</p><a className="text-link" href={`/teams?project=${encodeURIComponent(project.title)}`}>Find teammates <span>→</span></a></article>)}</div>{!projects.length && !error && <div className="empty-state"><strong>No projects in this filter</strong><span>Seed the database to load the demo library.</span></div>}</main>
}
