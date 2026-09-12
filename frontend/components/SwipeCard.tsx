'use client'

import React, { useState, useRef, useEffect } from 'react'

interface MatchCard {
    userId: string
    userName: string
    avatar: string
    matchScore: number
    matchPercentage: number
    reason: string
    swapOpportunity: {
        type: string
        userATeaches: any[]
        userBTeaches: any[]
    }
    hobbies?: string[]
    interests?: string[]
    goals?: string[]
    availability?: string[]
    reputation?: number
    skillDna?: any[]
}

interface SwipeCardProps {
    cards: MatchCard[]
    onSwipe: (cardId: string, action: 'like' | 'pass') => void
    onMatch?: (cardId: string) => void
}

export default function SwipeCard({ cards, onSwipe, onMatch }: SwipeCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [exitX, setExitX] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const startXRef = useRef(0)
    const currentXRef = useRef(0)

    const currentCard = cards[currentIndex]

    const handleMouseDown = (e: React.MouseEvent) => {
        startXRef.current = e.clientX
        currentXRef.current = e.clientX
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (startXRef.current === 0) return

        currentXRef.current = e.clientX
        const diff = e.clientX - startXRef.current

        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(${diff}px) rotate(${diff * 0.1}deg)`
            containerRef.current.style.opacity = String(1 - Math.abs(diff) / 500)
        }
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        const diff = currentXRef.current - startXRef.current

        if (Math.abs(diff) > 100) {
            // Swipe detected
            const action = diff > 0 ? 'like' : 'pass'
            handleSwipe(action, diff)
        } else {
            // Reset
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateX(0) rotate(0deg)'
                containerRef.current.style.opacity = '1'
            }
        }

        startXRef.current = 0
    }

    const handleSwipe = (action: 'like' | 'pass', distance: number) => {
        if (!currentCard) return

        setExitX(distance > 0 ? 1000 : -1000)
        onSwipe(currentCard.userId, action)

        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1)
            setExitX(0)
            if (containerRef.current) {
                containerRef.current.style.transform = 'translateX(0) rotate(0deg)'
                containerRef.current.style.opacity = '1'
            }
        }, 300)
    }

    if (!currentCard) {
        return (
            <div className="flex items-center justify-center h-96 bg-gradient-to-br from-cream to-white rounded-2xl border-2 border-dashed border-line">
                <div className="text-center">
                    <p className="text-2xl font-bold text-ink mb-2">🎉 No more matches!</p>
                    <p className="text-muted">Come back later for more people to connect with</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Swipe Card */}
            <div
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-300 select-none"
                style={{
                    transform: `translateX(${exitX}px)`,
                    opacity: exitX === 0 ? 1 : 0,
                }}
            >
                {/* Profile Section */}
                <div className="relative h-96 bg-gradient-to-br from-orange via-lime to-cream overflow-hidden">
                    {/* Avatar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-white shadow-lg overflow-hidden border-4 border-cream">
                            {currentCard.avatar ? (
                                <img
                                    src={currentCard.avatar}
                                    alt={currentCard.userName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-orange text-white text-5xl font-bold">
                                    {currentCard.userName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                        <p className="text-sm font-bold text-orange">{currentCard.matchPercentage}% Match</p>
                    </div>

                    {/* Name and Location */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                        <h2 className="text-3xl font-bold">{currentCard.userName}</h2>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-4">
                    {/* Match Reason */}
                    <div className="flex items-start gap-3 p-3 bg-lime bg-opacity-10 rounded-lg border border-lime border-opacity-30">
                        <span className="text-xl">💡</span>
                        <p className="text-sm text-ink">{currentCard.reason}</p>
                    </div>

                    {/* Skill Swap Opportunity */}
                    {currentCard.swapOpportunity && (
                        <div className="bg-orange bg-opacity-10 border border-orange border-opacity-30 rounded-lg p-4">
                            <p className="text-xs font-semibold text-orange mb-2">🔄 SKILL SWAP OPPORTUNITY</p>
                            <div className="space-y-2">
                                {currentCard.swapOpportunity.userATeaches &&
                                    currentCard.swapOpportunity.userATeaches.length > 0 && (
                                        <p className="text-sm text-ink">
                                            ✓ They can teach: <span className="font-semibold">{currentCard.swapOpportunity.userATeaches.map(s => s.name).join(', ')}</span>
                                        </p>
                                    )}
                                {currentCard.swapOpportunity.userBTeaches &&
                                    currentCard.swapOpportunity.userBTeaches.length > 0 && (
                                        <p className="text-sm text-ink">
                                            ✓ You can teach: <span className="font-semibold">{currentCard.swapOpportunity.userBTeaches.map(s => s.name).join(', ')}</span>
                                        </p>
                                    )}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {currentCard.skillDna && currentCard.skillDna.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-muted mb-2">TOP SKILLS</p>
                            <div className="flex flex-wrap gap-2">
                                {currentCard.skillDna.slice(0, 4).map((skill) => (
                                    <span
                                        key={skill.name}
                                        className="px-3 py-1 bg-ink bg-opacity-10 text-ink text-xs font-semibold rounded-full"
                                    >
                                        {skill.name} {skill.confidence > 80 && '⭐'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Interests */}
                    {currentCard.interests && currentCard.interests.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold text-muted mb-2">INTERESTS</p>
                            <p className="text-sm text-ink">{currentCard.interests.slice(0, 3).join(', ')}</p>
                        </div>
                    )}

                    {/* Reputation */}
                    {typeof currentCard.reputation === 'number' && (
                        <div className="flex items-center gap-2 text-sm">
                            <span>⭐ Reputation: </span>
                            <div className="flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={i < Math.floor((currentCard.reputation ?? 0) / 1) ? 'text-orange' : 'text-line'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-8">
                {/* Pass Button */}
                <button
                    onClick={() => handleSwipe('pass', -100)}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-ink text-ink font-semibold hover:bg-ink hover:text-white transition-all transform hover:scale-105 shadow-lg"
                >
                    <span className="text-2xl">❌</span>
                    <span>Pass</span>
                </button>

                {/* Like Button */}
                <button
                    onClick={() => handleSwipe('like', 100)}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange text-white font-semibold hover:bg-orange hover:shadow-xl transition-all transform hover:scale-105 shadow-lg"
                >
                    <span className="text-2xl">❤️</span>
                    <span>Like</span>
                </button>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 text-center text-sm text-muted">
                {currentIndex + 1} of {cards.length} people
            </div>
        </div>
    )
}
