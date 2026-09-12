'use client'

import React, { useEffect, useRef } from 'react'

interface ChainParticipant {
    userId: string
    userName: string
    teaches: string
}

interface SkillChain {
    participants: ChainParticipant[]
    compatibility: number
    description: string
}

interface SkillChainVisualizerProps {
    chain: SkillChain
    onAccept?: () => void
    onReject?: () => void
}

export default function SkillChainVisualizer({ chain, onAccept, onReject }: SkillChainVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Draw animated chain visualization
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height
        const centerY = height / 2
        const participantCount = chain.participants.length
        const spacing = width / (participantCount + 1)

        // Clear canvas
        ctx.fillStyle = '#f3f1ea'
        ctx.fillRect(0, 0, width, height)

        // Draw nodes (participants)
        const positions = chain.participants.map((_, index) => ({
            x: spacing * (index + 1),
            y: centerY,
        }))

        // Draw connection arrows
        ctx.strokeStyle = '#f36c3d'
        ctx.lineWidth = 3
        ctx.setLineDash([5, 5])
        ctx.lineCap = 'round'

        for (let i = 0; i < positions.length; i++) {
            const from = positions[i]
            const to = positions[(i + 1) % positions.length]

            // Draw arrow line
            ctx.beginPath()
            ctx.moveTo(from.x + 35, from.y)
            ctx.lineTo(to.x - 35, to.y)
            ctx.stroke()

            // Draw arrowhead
            const angle = Math.atan2(to.y - from.y, to.x - from.x)
            const arrowSize = 15
            ctx.setLineDash([])
            ctx.fillStyle = '#f36c3d'
            ctx.beginPath()
            ctx.moveTo(to.x - 35, to.y)
            ctx.lineTo(to.x - 35 - arrowSize * Math.cos(angle - Math.PI / 6), to.y - arrowSize * Math.sin(angle - Math.PI / 6))
            ctx.lineTo(to.x - 35 - arrowSize * Math.cos(angle + Math.PI / 6), to.y - arrowSize * Math.sin(angle + Math.PI / 6))
            ctx.closePath()
            ctx.fill()
            ctx.setLineDash([5, 5])
        }

        ctx.setLineDash([])

        // Draw participant nodes
        chain.participants.forEach((participant, index) => {
            const pos = positions[index]

            // Node circle
            ctx.fillStyle = index === 0 ? '#d8ec7b' : '#f36c3d'
            ctx.beginPath()
            ctx.arc(pos.x, pos.y, 35, 0, Math.PI * 2)
            ctx.fill()

            ctx.strokeStyle = '#17211d'
            ctx.lineWidth = 2
            ctx.stroke()

            // Participant initials
            ctx.fillStyle = '#17211d'
            ctx.font = 'bold 18px Space Grotesk'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const initials = participant.userName
                .split(' ')
                .map((n) => n.charAt(0))
                .join('')
            ctx.fillText(initials, pos.x, pos.y)

            // Skill label
            ctx.font = '11px Space Grotesk'
            ctx.fillStyle = '#69736d'
            ctx.fillText(participant.teaches, pos.x, pos.y + 55)
        })
    }, [chain])

    return (
        <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-line">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange via-lime to-cream p-8 text-center">
                <div className="inline-block bg-white px-4 py-2 rounded-full mb-4">
                    <span className="text-3xl">⛓️</span>
                </div>
                <h2 className="text-3xl font-bold text-ink mb-2">Skill Chain Found!</h2>
                <p className="text-muted">{chain.participants.length} people can exchange knowledge</p>
            </div>

            {/* Canvas */}
            <div className="p-8">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    className="w-full h-auto bg-cream rounded-lg border border-line"
                />
            </div>

            {/* Chain Details */}
            <div className="px-8 pb-8 space-y-6">
                {/* Compatibility Score */}
                <div className="flex items-center justify-between p-4 bg-lime bg-opacity-10 border border-lime rounded-lg">
                    <span className="text-lg font-semibold text-ink">Chain Compatibility</span>
                    <span className="text-3xl font-bold text-lime">{chain.compatibility}%</span>
                </div>

                {/* Chain Breakdown */}
                <div className="space-y-4">
                    <h3 className="font-semibold text-ink">How the Chain Works:</h3>

                    {chain.participants.map((participant, index) => {
                        const nextIndex = (index + 1) % chain.participants.length
                        const nextParticipant = chain.participants[nextIndex]

                        return (
                            <div key={participant.userId} className="flex items-start gap-4">
                                {/* This person */}
                                <div className="flex-1 p-4 bg-orange bg-opacity-10 rounded-lg border border-orange">
                                    <p className="font-semibold text-ink">{participant.userName}</p>
                                    <p className="text-sm text-muted">Teaches: {participant.teaches}</p>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center pt-2">
                                    <span className="text-2xl text-orange">→</span>
                                </div>

                                {/* Next person */}
                                <div className="flex-1 p-4 bg-lime bg-opacity-10 rounded-lg border border-lime">
                                    <p className="font-semibold text-ink">{nextParticipant.userName}</p>
                                    <p className="text-sm text-muted">Learns: {participant.teaches}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Description */}
                <div className="p-4 bg-slate-50 rounded-lg border border-line">
                    <p className="text-sm text-ink leading-relaxed">{chain.description}</p>
                </div>

                {/* Benefits Box */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-cream rounded-lg">
                        <p className="text-3xl mb-2">💰</p>
                        <p className="text-sm font-semibold text-ink">Free Exchange</p>
                        <p className="text-xs text-muted">No money needed</p>
                    </div>

                    <div className="text-center p-4 bg-cream rounded-lg">
                        <p className="text-3xl mb-2">🏆</p>
                        <p className="text-sm font-semibold text-ink">Earn XP</p>
                        <p className="text-xs text-muted">Learn & teach rewards</p>
                    </div>

                    <div className="text-center p-4 bg-cream rounded-lg">
                        <p className="text-3xl mb-2">🌍</p>
                        <p className="text-sm font-semibold text-ink">Community</p>
                        <p className="text-xs text-muted">Build connections</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={onReject}
                        className="flex-1 py-3 px-4 rounded-lg bg-white border-2 border-ink text-ink font-semibold hover:bg-ink hover:text-white transition-all transform hover:scale-105"
                    >
                        ❌ Not Interested
                    </button>

                    <button
                        onClick={onAccept}
                        className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-orange to-lime text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                    >
                        ✅ Accept Chain
                    </button>
                </div>

                {/* Info Text */}
                <p className="text-xs text-muted text-center">
                    ℹ️ The chain will activate only when all {chain.participants.length} participants accept.
                </p>
            </div>
        </div>
    )
}
