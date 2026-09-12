'use client'

import { useState } from 'react'

const heroImage = 'https://skill-spark-ai-960.lovable.app/assets/hero-exchange-XD4Uh5y0.jpg'

const features = [
    ['01', 'Reciprocal matching', 'We score every pairing on both directions - what they can teach you and what you can teach them - plus availability, language and learning style.'],
    ['02', 'AI skill-gap analysis', 'Paste your resume, GitHub or portfolio. Get missing skills, a readiness radar, a phased roadmap and a salary estimate for your target role.'],
    ['03', 'Communities & feed', 'Topic rooms for AI, ML, Web, DSA, Cybersecurity, Cloud and UI/UX with posts, comments and realtime chat.'],
    ['04', 'Mentor marketplace', 'Verified mentors publish sessions with topics, pricing and slots. Book, meet, review.'],
    ['05', 'Hackathons & teams', "Discover hackathons, register, and let AI generate project ideas tuned to your team's actual skills."],
    ['06', 'Social profiles', 'Skills, proficiency, college, links, XP, levels and streaks - a profile built for being found.'],
]

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <main className="lovable-home">
            <header className="lovable-header">
                <a href="#top" className="lovable-logo"><span className="lovable-logo-mark">✦</span><strong>SkillSwap</strong> <span>AI</span></a>
                <nav className={menuOpen ? 'lovable-nav is-open' : 'lovable-nav'}>
                    <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
                    <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
                    <a href="#start" onClick={() => setMenuOpen(false)}>Get started</a>
                </nav>
                <div className="lovable-header-actions">
                    <a href="/login" className="lovable-signin">Sign in</a>
                    <a href="/register" className="lovable-small-button">Get started <span>↗</span></a>
                    <button className="lovable-menu" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
                </div>
            </header>

            <section className="lovable-hero" id="top">
                <div className="lovable-hero-copy">
                    <p className="lovable-eyebrow"><span>✦</span> Peer-to-peer learning, scored by AI</p>
                    <h1>Teach what you know.<br /><em>Learn what you need.</em></h1>
                    <p className="lovable-lede">SkillSwap AI pairs students whose skills complete each other, then shows both sides exactly what to work on next - with roadmaps, mentors, communities and hackathon teams built in.</p>
                    <div className="lovable-hero-actions"><a href="/register" className="lovable-primary-button">Start swapping <span>↗</span></a><a href="#how" className="lovable-text-button">See how it works <span>↓</span></a></div>
                    <dl className="lovable-metrics"><div><dt>6</dt><dd>areas scored</dd></div><div><dt>8</dt><dd>communities</dd></div><div><dt>2-way</dt><dd>matching</dd></div></dl>
                </div>
                <div className="lovable-hero-image"><img src={heroImage} alt="Two students exchanging skills - one explaining code at a chalkboard, the other sketching a design" /><span className="lovable-image-note">Learn together <b>↗</b></span></div>
            </section>

            <section className="lovable-features" id="features">
                <div className="lovable-section-heading"><p className="lovable-eyebrow">One loop, many ways forward</p><h2>Everything a student needs,<br /><em>in one loop.</em></h2></div>
                <div className="lovable-feature-grid">{features.map(([number, title, description]) => <article className="lovable-feature" key={title}><span className="lovable-feature-number">{number}</span><span className="lovable-feature-icon">✦</span><h3>{title}</h3><p>{description}</p><a href="/register" aria-label={`Explore ${title}`}>↗</a></article>)}</div>
            </section>

            <section className="lovable-start" id="start"><div><p className="lovable-eyebrow">Make your first move</p><h2>Your first swap is<br /><em>one profile away.</em></h2><p>Add two skills you can teach and two you want to learn. We&apos;ll do the rest.</p><a href="/register" className="lovable-primary-button">Create your profile <span>↗</span></a></div><div className="lovable-start-orbit"><span>teach</span><strong>↔</strong><span>learn</span></div></section>

            <footer className="lovable-footer"><a href="#top" className="lovable-logo"><span className="lovable-logo-mark">✦</span><strong>SkillSwap</strong> <span>AI</span></a><span>© 2026 SkillSwap AI - built for students who learn together.</span><a href="/login">Sign in ↗</a></footer>
        </main>
    )
}
