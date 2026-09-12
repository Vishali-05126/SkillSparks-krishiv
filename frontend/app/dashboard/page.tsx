'use client'

import { useEffect, useState } from 'react'
import SkillDnaVisualization from '@/components/SkillDnaVisualization'
import GamificationUI from '@/components/GamificationUI'

type DashboardData = {
    name: string
    level?: number
    currentXp?: number
    xpNeededForNextLevel?: number
    totalXp?: number
    connections?: number
    skillsLearned?: number
    peopleTeached?: number
    skillCoins?: number
    streak?: number
    badges?: any[]
    rank?: number
    totalUsers?: number
    skillDna?: Array<{ name: string; confidence: number; level: number; evidence: unknown; sources: string[]; strengths: string[]; weaknesses: string[] }>
}

export default function DashboardPage() {
    const [userData, setUserData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/profile')
                if (response.status === 401) { window.location.href = '/login'; return }
                if (!response.ok) throw new Error('Unable to load profile')
                const result = await response.json()
                const profile = result.user
                setUserData({
                    ...profile,
                    level: Math.max(1, Math.floor(Number(profile.totalXp || 0) / 250) + 1),
                    currentXp: Number(profile.totalXp || 0) % 250,
                    xpNeededForNextLevel: 250,
                    connections: Number(profile.connections || 0),
                    skillsLearned: Array.isArray(profile.lookingFor) ? profile.lookingFor.length : 0,
                    peopleTeached: Array.isArray(profile.skills) ? profile.skills.length : 0,
                    skillCoins: Number(profile.skillCoins || 0), streak: Number(profile.streak || 0),
                    rank: 1, totalUsers: 1, badges: profile.badges || [],
                })
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUserData()
    }, [])

    if (loading) return <main className="dashboard-shell dashboard-state"><span className="dashboard-spinner" /><p>Loading your dashboard...</p></main>
    if (!userData) return <main className="dashboard-shell dashboard-state"><p>Failed to load dashboard</p><a href="/" className="dashboard-button">Back to home <span>-&gt;</span></a></main>

    const level = userData.level || 1
    const currentXp = userData.currentXp || 0
    const xpNeeded = userData.xpNeededForNextLevel || 250
    const progress = Math.min(100, Math.round((currentXp / xpNeeded) * 100))

    return (
        <main className="dashboard-shell">
            <header className="dashboard-header">
                <button className="dashboard-menu" type="button" aria-label="Open navigation"><span /><span /><span /></button>
                <a className="dashboard-brand" href="/"><span className="dashboard-brand-mark">✦</span><strong>SkillSwap</strong> <span>AI</span></a>
                <nav className="dashboard-nav"><a href="/dashboard" className="is-active">Dashboard</a><a href="/discover">Discover</a><a href="/sessions">Sessions</a><a href="/profile">Profile</a></nav>
                <a href="/profile" className="dashboard-avatar" aria-label="Open profile">{userData.name.slice(0, 1).toUpperCase()}</a>
            </header>

            <div className="dashboard-content">
                <section className="dashboard-intro"><p className="dashboard-kicker">Your learning space</p><h1>Hello, {userData.name.split(' ')[0]}</h1><p>Here&apos;s where your skill exchange stands today.</p></section>

                <section className="dashboard-kpis" aria-label="Skill summary">
                    <article className="dashboard-kpi"><span className="dashboard-icon">▣</span><strong>{userData.peopleTeached || 0}</strong><p>Can teach</p><small>Share what you know</small></article>
                    <article className="dashboard-kpi"><span className="dashboard-icon">⌁</span><strong>{userData.skillsLearned || 0}</strong><p>Want to learn</p><small>Keep your curiosity moving</small></article>
                    <article className="dashboard-kpi dashboard-kpi-accent"><span className="dashboard-icon">↗</span><strong>{userData.connections || 0}</strong><p>Connections</p><small>People in your circle</small></article>
                </section>

                <section className="dashboard-level panel">
                    <div className="dashboard-level-top"><div><p className="dashboard-label">Your progress</p><h2>Level {level}</h2></div><span className="dashboard-xp">{userData.totalXp || 0} XP</span></div>
                    <div className="dashboard-progress"><span style={{ width: `${progress}%` }} /></div>
                    <p className="dashboard-progress-copy">{currentXp} XP <span>·</span> {xpNeeded} XP to level {level + 1}</p>
                    <div className="dashboard-actions">
                        <a href="/coach" className="dashboard-action"><span className="dashboard-action-icon">AI</span><div><strong>Ask your AI Coach</strong><p>See people who best match your goals and skills.</p></div><span className="dashboard-arrow">-&gt;</span></a>
                        <a href="/skill-gap" className="dashboard-action"><span className="dashboard-action-icon">♧</span><div><strong>Run a skill-gap analysis</strong><p>Get missing skills, a roadmap and a readiness score.</p></div><span className="dashboard-arrow">-&gt;</span></a>
                        <a href="/projects" className="dashboard-action"><span className="dashboard-action-icon">♢</span><div><strong>Find a project</strong><p>Put your skills to work with a new team.</p></div><span className="dashboard-arrow">-&gt;</span></a>
                    </div>
                </section>

                <section className="dashboard-sessions panel">
                    <div className="dashboard-section-heading"><div><p className="dashboard-label">Keep your momentum</p><h2>Upcoming sessions</h2></div><a href="/sessions">View all <span>-&gt;</span></a></div>
                    <div className="dashboard-session-row"><span className="session-date"><strong>24</strong><small>SEP</small></span><div><strong>Design critique swap</strong><p>With the SkillSwap community</p></div><span className="session-time">10:30 AM</span><a href="/sessions" className="dashboard-outline-button">View</a></div>
                </section>

                {userData.skillDna && userData.skillDna.length > 0 && <section className="dashboard-secondary"><SkillDnaVisualization skills={userData.skillDna} /></section>}
                <div className="dashboard-secondary"><GamificationUI userLevel={level} currentXp={currentXp} xpNeededForNextLevel={xpNeeded} totalXp={userData.totalXp || 0} skillCoins={userData.skillCoins || 0} streak={userData.streak || 0} badges={userData.badges || []} rank={userData.rank || 1} totalUsers={userData.totalUsers || 1} /></div>
            </div>
        </main>
    )
}
