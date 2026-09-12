'use client'

import { useState } from 'react'

type Badge = {
    id: string
    name: string
    icon: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
    description: string
    unlockedAt?: string
}

type Challenge = { id: string; title: string; description: string; xp: number; coins: number; completed: boolean }

interface GamificationUIProps {
    userLevel: number
    currentXp: number
    xpNeededForNextLevel: number
    totalXp: number
    skillCoins: number
    streak: number
    badges: Badge[]
    rank: number
    totalUsers: number
}

const initialChallenges: Challenge[] = [
    { id: 'practice', title: 'Daily practice', description: 'Spend 10 minutes improving a skill.', xp: 100, coins: 10, completed: true },
    { id: 'share', title: 'Share knowledge', description: 'Post one useful tip for the community.', xp: 150, coins: 25, completed: false },
    { id: 'challenge', title: 'Complete a challenge', description: 'Finish one learning action today.', xp: 200, coins: 30, completed: false },
]

export default function GamificationUI({ userLevel, currentXp, xpNeededForNextLevel, totalXp, skillCoins, streak, badges, rank, totalUsers }: GamificationUIProps) {
    const [challenges, setChallenges] = useState(initialChallenges)
    const [notice, setNotice] = useState('')
    const progress = Math.min(100, Math.round((currentXp / Math.max(1, xpNeededForNextLevel)) * 100))
    const percentile = totalUsers > 1 ? Math.max(1, Math.round((rank / totalUsers) * 100)) : 1
    const unlockedBadges = badges.filter((badge) => badge.unlockedAt)
    const leaderboard = [
        { position: 1, name: 'Alex Chen', xp: 152000, avatar: 'AC' },
        { position: 2, name: 'Sarah Johnson', xp: 148500, avatar: 'SJ' },
        { position: rank, name: 'You', xp: totalXp, avatar: 'YU', isYou: true },
        { position: 4, name: 'Mike Smith', xp: 145000, avatar: 'MS' },
        { position: 5, name: 'Emma Wilson', xp: 142800, avatar: 'EW' },
    ]

    function startChallenge(challenge: Challenge) {
        setChallenges((current) => current.map((item) => item.id === challenge.id ? { ...item, completed: true } : item))
        setNotice(`${challenge.title} complete. +${challenge.xp} XP and ${challenge.coins} coins added.`)
    }

    return <section className="gamification-board" aria-label="Progress and gamification">
        <div className="gamification-hero">
            <div className="gamification-level"><span className="gamification-overline">Current level</span><strong>{userLevel}</strong><span>Keep learning to level up</span></div>
            <div className="gamification-progress"><div className="gamification-progress-heading"><span><b>XP progress</b><small>{currentXp} / {xpNeededForNextLevel} XP</small></span><strong>{progress}%</strong></div><div className="gamification-track"><span style={{ width: `${progress}%` }} /></div><p>{Math.max(0, xpNeededForNextLevel - currentXp)} XP until level {userLevel + 1}</p></div>
            <div className="gamification-rank"><span className="gamification-rank-icon">#</span><span className="gamification-overline">Global rank</span><strong>#{rank}</strong><span>of {totalUsers}</span></div>
        </div>

        <div className="gamification-stats">
            <Stat icon="◈" value={skillCoins} label="Skill coins" tone="orange" />
            <Stat icon="◒" value={streak} label="Day streak" tone="green" />
            <Stat icon="✦" value={`${Math.round(totalXp / 1000)}k`} label="Total XP" tone="yellow" />
            <Stat icon="↗" value={`${percentile}%`} label="Top percentile" tone="blue" />
        </div>

        <div className="gamification-columns">
            <section className="gamification-card gamification-challenges" id="daily-challenges"><div className="gamification-card-heading"><div><span className="gamification-overline">Build your momentum</span><h3>Daily challenges</h3></div><span className="gamification-count">{challenges.filter((item) => item.completed).length}/{challenges.length}</span></div><div className="challenge-list">{challenges.map((challenge) => <article className={challenge.completed ? 'challenge-item is-complete' : 'challenge-item'} key={challenge.id}><span className="challenge-icon">{challenge.completed ? '✓' : '○'}</span><div><strong>{challenge.title}</strong><p>{challenge.description}</p><small><b>⚡ {challenge.xp} XP</b><b>◈ {challenge.coins}</b></small></div>{challenge.completed ? <span className="challenge-done">Done</span> : <button type="button" className="challenge-start" onClick={() => startChallenge(challenge)}>Start</button>}</article>)}</div>{notice && <p className="gamification-notice" role="status">{notice}</p>}</section>

            <section className="gamification-card gamification-leaderboard"><div className="gamification-card-heading"><div><span className="gamification-overline">Stay inspired</span><h3>Global leaderboard</h3></div><a href="/discover">View all <span>↗</span></a></div><div className="leaderboard-list">{leaderboard.map((entry) => <div className={entry.isYou ? 'leaderboard-row is-you' : 'leaderboard-row'} key={`${entry.name}-${entry.position}`}><strong className="leaderboard-position">#{entry.position}</strong><span className="leaderboard-avatar">{entry.avatar}</span><span className="leaderboard-name">{entry.name}</span><b>{Math.round(entry.xp / 1000)}k <small>XP</small></b></div>)}</div></section>
        </div>

        <section className="gamification-card gamification-badges"><div className="gamification-card-heading"><div><span className="gamification-overline">Milestones</span><h3>Badges earned</h3></div><span className="gamification-count">{unlockedBadges.length}/{badges.length}</span></div>{badges.length ? <div className="badge-list">{badges.map((badge) => <div className={badge.unlockedAt ? 'badge-item' : 'badge-item is-locked'} key={badge.id}><span>{badge.icon}</span><strong>{badge.name}</strong><small>{badge.rarity}</small></div>)}</div> : <div className="badges-empty"><span className="badges-empty-icon">✦</span><div><strong>Your first badge is waiting</strong><p>Complete a daily challenge to start your collection.</p></div><a href="#daily-challenges">View challenges <span>↗</span></a></div>}</section>
    </section>
}

function Stat({ icon, value, label, tone }: { icon: string; value: string | number; label: string; tone: string }) {
    return <article className={`gamification-stat tone-${tone}`}><span>{icon}</span><div><strong>{value}</strong><p>{label}</p></div></article>
}
