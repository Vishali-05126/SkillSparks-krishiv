'use client'

import { useEffect, useState } from 'react'

type Match = { id: string; name: string; headline?: string; bio?: string; avatarUrl?: string; city?: string; skills: string[]; lookingFor: string[]; score: number; theyTeach: string[]; youTeach: string[]; sharedInterests: string[]; reason: string }
type CoachResponse = { coach: { title: string; message: string; action: string; href: string }; profile: { name: string; skills: string[]; lookingFor: string[] }; matches: Match[] }

export default function CoachPage() {
    const [data, setData] = useState<CoachResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [question, setQuestion] = useState('')
    const [reply, setReply] = useState('')
    const [thinking, setThinking] = useState(false)

    useEffect(() => {
        fetch('/api/coach/matches').then(async (response) => {
            const result = await response.json()
            if (response.status === 401) { window.location.href = '/login'; return }
            if (!response.ok) throw new Error(result.error || 'Unable to prepare your recommendations.')
            setData(result)
        }).catch((cause) => setError(cause.message || 'Unable to prepare your recommendations.')).finally(() => setLoading(false))
    }, [])

    if (loading) return <main className="coach-page coach-loading"><span className="coach-loader" /><p>AI Coach is reviewing your learning profile...</p></main>
    if (error || !data) return <main className="coach-page coach-loading"><h1>Coach is taking a short break.</h1><p>{error || 'Please try again.'}</p><a className="coach-button coach-button-dark" href="/dashboard">Back to dashboard</a></main>

    async function askCoach(nextQuestion?: string) {
        const message = (nextQuestion || question).trim()
        if (!message || thinking) return
        setThinking(true); setReply('')
        try {
            const response = await fetch('/api/coach/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) })
            const result = await response.json()
            if (!response.ok) throw new Error(result.error || 'The coach could not respond right now.')
            setReply(result.reply); setQuestion('')
        } catch (cause: any) { setReply(cause.message || 'The coach could not respond right now.') } finally { setThinking(false) }
    }

    return <main className="coach-page">
        <section className="coach-hero"><div><p className="coach-kicker">SkillSwap AI Coach</p><h1>Meet the people who move your learning <em>forward.</em></h1><p className="coach-lede">Your recommendations use what you want to learn, what you can offer, and the interests you share. They refresh whenever you update your profile.</p></div><aside className="coach-signal"><span className="coach-signal-icon">AI</span><p>Learning now</p><strong>{data.profile.lookingFor.length ? data.profile.lookingFor.slice(0, 2).join(' + ') : 'Add a learning goal'}</strong><small>{data.profile.skills.length} skill{data.profile.skills.length === 1 ? '' : 's'} to share</small></aside></section>
        <section className="coach-guidance"><div className="coach-guidance-mark">01</div><div><p className="coach-kicker">Coach note</p><h2>{data.coach.title}</h2><p>{data.coach.message}</p></div><a className="coach-button coach-button-dark" href={data.coach.href}>{data.coach.action} <span>→</span></a></section>
        <section className="coach-chat" aria-labelledby="coach-chat-title"><div className="coach-chat-copy"><p className="coach-kicker">Interactive guidance</p><h2 id="coach-chat-title">Ask your AI Coach</h2><p>Get a tailored starting plan, match advice, or a message you can send to begin a skill swap.</p><div className="coach-prompts"><button type="button" onClick={() => askCoach('Who should I match with?')}>Who should I match with?</button><button type="button" onClick={() => askCoach('Help me write an introduction message')}>Write my intro message</button><button type="button" onClick={() => askCoach('What should I learn first?')}>What should I learn first?</button></div></div><div className="coach-chat-window"><div className="coach-chat-status"><span /><strong>AI Coach</strong><small>Profile-aware</small></div>{reply ? <div className="coach-reply">{reply}</div> : <p className="coach-chat-placeholder">Ask a question and I’ll use your skills and learning goals to guide your next move.</p>}{thinking && <div className="coach-thinking"><i /><i /><i /> Thinking through your profile…</div>}<form onSubmit={(event) => { event.preventDefault(); askCoach() }}><label className="sr-only" htmlFor="coach-question">Ask your AI Coach</label><textarea id="coach-question" value={question} onChange={(event) => setQuestion(event.target.value)} maxLength={600} rows={4} placeholder="Ask about matches, goals, or your first message…" /><button type="submit" disabled={!question.trim() || thinking} aria-label="Send question">→</button></form></div></section>
        <section id="recommendations" className="coach-recommendations"><div className="coach-section-heading"><div><p className="coach-kicker">Recommended for you</p><h2>{data.matches.length ? `${data.matches.length} reciprocal matches` : 'No reciprocal matches yet'}</h2></div><a href="/profile" className="coach-edit-link">Fine-tune profile <span>→</span></a></div>
        {data.matches.length ? <div className="coach-match-grid">{data.matches.map((match, index) => <article className="coach-match-card" key={match.id}><div className="coach-match-top"><span className="coach-rank">0{index + 1}</span><span className="coach-score">{match.score}% fit</span></div><div className="coach-person"><div className="coach-avatar">{match.avatarUrl ? <img src={match.avatarUrl} alt="" /> : match.name.charAt(0).toUpperCase()}</div><div><h3>{match.name}</h3><p>{match.headline || match.city || 'SkillSwap learner'}</p></div></div><p className="coach-reason">{match.reason}</p><div className="coach-exchange"><div><span>They can help you</span><strong>{match.theyTeach.length ? match.theyTeach.join(', ') : 'Explore a shared goal'}</strong></div><div><span>You can offer</span><strong>{match.youTeach.length ? match.youTeach.join(', ') : 'A conversation to start'}</strong></div></div><a className="coach-profile-link" href={`/profile/${match.id}`}>View exchange <span>→</span></a></article>)}</div> : <div className="coach-empty"><h3>Give your coach a little more to work with.</h3><p>Add skills you can teach and skills you want to learn. As new members join, your coach will surface the best two-way exchanges.</p><a className="coach-button coach-button-orange" href="/profile">Update my profile <span>→</span></a></div>}</section>
    </main>
}
