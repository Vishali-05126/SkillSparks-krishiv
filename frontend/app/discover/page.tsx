'use client'

import { useEffect, useState } from 'react'
import SwipeCard from '@/components/SwipeCard'
import SkillChainVisualizer from '@/components/SkillChainVisualizer'

export default function DiscoverPage() {
    const [matches, setMatches] = useState<any[]>([])
    const [skillChains, setSkillChains] = useState<any[]>([])
    const [currentChainIndex, setCurrentChainIndex] = useState(0)
    const [view, setView] = useState<'matches' | 'chains'>('matches')
    const [loading, setLoading] = useState(true)
    const [userMatched, setUserMatched] = useState(false)

    useEffect(() => {
        fetchMatches()
    }, [])

    async function fetchMatches() {
        setLoading(true)
        try {
            const response = await fetch('/api/coach/matches')

            if (response.ok) {
                const data = await response.json()
                setMatches((data.matches || []).map((match: any) => ({
                    userId: match.id,
                    userName: match.name,
                    avatar: match.avatarUrl,
                    matchScore: match.score,
                    matchPercentage: match.score,
                    reason: match.reason,
                    swapOpportunity: { type: 'direct_swap', userATeaches: match.theyTeach.map((name: string) => ({ name, confidence: 90 })), userBTeaches: match.youTeach.map((name: string) => ({ name, confidence: 90 })) },
                    hobbies: [], interests: match.sharedInterests || [], goals: [], availability: [], reputation: 0,
                    skillDna: (match.skills || []).map((name: string) => ({ name, confidence: 80 })),
                })))
                setSkillChains([])
            }
        } catch (err) {
            console.error('Failed to fetch matches:', err)
        } finally {
            setLoading(false)
        }
    }

    async function handleSwipe(userId: string, action: 'like' | 'pass') {
        try {
            const response = await fetch('/api/connections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ recipientId: userId, message: action === 'like' ? 'Hi! Your profile looks like a strong skill-swap fit. I would love to connect.' : '' }),
            })

            if ((response.ok || response.status === 409) && action === 'like') {
                setUserMatched(true)
                setTimeout(() => setUserMatched(false), 2000)
            }
        } catch (err) {
            console.error('Failed to record swipe:', err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cream to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-5xl mb-4">⚡</div>
                    <p className="text-lg text-muted">Finding your perfect matches...</p>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-cream to-white">
            {/* Header */}
            <header className="topbar sticky top-0 z-10">
                <a className="brand" href="/">
                    <span className="brand-mark">↗</span> SkillSwap <em>AI</em>
                </a>
                <nav className="flex gap-6 items-center">
                    <button
                        onClick={() => setView('matches')}
                        className={`text-sm font-semibold transition-colors ${view === 'matches' ? 'text-orange' : 'text-muted'
                            }`}
                    >
                        Discover ({matches.length})
                    </button>
                    <button
                        onClick={() => setView('chains')}
                        className={`text-sm font-semibold transition-colors ${view === 'chains' ? 'text-orange' : 'text-muted'
                            }`}
                    >
                        Skill Chains ({skillChains.length})
                    </button>
                    <a href="/profile" className="button button-dark">
                        Profile <span>→</span>
                    </a>
                </nav>
            </header>

            {/* Main Content */}
            <div className="section">
                {/* Match Notification */}
                {userMatched && (
                    <div className="mb-8 p-6 bg-gradient-to-r from-lime to-orange rounded-2xl text-white text-center animate-bounce">
                        <p className="text-2xl font-bold">🎉 It's a Match!</p>
                        <p className="text-sm mt-2">You both liked each other! Check your connections.</p>
                    </div>
                )}

                {view === 'matches' ? (
                    <>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-ink mb-2">Discover Matches</h1>
                            <p className="text-lg text-muted">
                                Swipe to find people to learn from and teach. AI matches based on skills, goals,
                                interests & availability.
                            </p>
                        </div>

                        {matches.length > 0 ? (
                            <SwipeCard cards={matches} onSwipe={handleSwipe} />
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-2xl text-muted mb-4">No more matches today</p>
                                <p className="text-sm text-muted mb-8">
                                    Come back later for more people to connect with!
                                </p>
                                <button
                                    onClick={() => setView('chains')}
                                    className="button button-orange"
                                >
                                    Check Skill Chains <span>→</span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-ink mb-2">Skill Chains</h1>
                            <p className="text-lg text-muted">
                                🎉 {skillChains.length} multi-person skill exchange opportunities found!
                            </p>
                        </div>

                        {skillChains.length > 0 ? (
                            <div className="space-y-8">
                                <SkillChainVisualizer
                                    chain={skillChains[currentChainIndex]}
                                    onAccept={() => setCurrentChainIndex((prev) => prev + 1 < skillChains.length ? prev + 1 : prev)}
                                    onReject={() => {
                                        setCurrentChainIndex((prev) =>
                                            prev + 1 < skillChains.length ? prev + 1 : prev
                                        )
                                    }}
                                />

                                {currentChainIndex < skillChains.length - 1 && (
                                    <div className="text-center">
                                        <p className="text-sm text-muted">
                                            Chain {currentChainIndex + 1} of {skillChains.length}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-2xl text-muted mb-4">No skill chains yet</p>
                                <p className="text-sm text-muted mb-8">
                                    Add more interests and goals to get matched in chains!
                                </p>
                                <button
                                    onClick={() => setView('matches')}
                                    className="button button-orange"
                                >
                                    Back to Matches <span>→</span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}
