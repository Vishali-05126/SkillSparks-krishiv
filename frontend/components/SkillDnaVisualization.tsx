'use client'

import React, { useEffect, useRef, useCallback } from 'react'

interface Skill {
    name: string
    confidence: number
    level: number
    evidence: any
    sources: string[]
    strengths: string[]
    weaknesses: string[]
}

interface SkillDnaProps {
    skills: Skill[]
    animated?: boolean
}

export default function SkillDnaVisualization({ skills, animated = true }: SkillDnaProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Draw animated skill DNA graph
    useEffect(() => {
        if (!canvasRef.current || !skills.length) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const width = canvas.width
        const height = canvas.height
        const centerX = width / 2
        const centerY = height / 2
        const maxRadius = Math.min(width, height) / 3

        // Clear canvas
        ctx.fillStyle = '#f3f1ea'
        ctx.fillRect(0, 0, width, height)

        // Draw concentric circles (levels)
        ctx.strokeStyle = '#d9ddd4'
        ctx.lineWidth = 1
        for (let i = 1; i <= 5; i++) {
            const radius = (maxRadius / 5) * i
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.stroke()
        }

        // Draw skill DNA hexagon/radar
        const angleSlice = (Math.PI * 2) / skills.length
        const skillPoints = skills.map((skill, index) => {
            const angle = angleSlice * index - Math.PI / 2
            const radius = (skill.confidence / 100) * maxRadius
            return {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle),
                skill,
            }
        })

        // Draw filled polygon
        ctx.fillStyle = 'rgba(243, 108, 61, 0.2)'
        ctx.strokeStyle = '#f36c3d'
        ctx.lineWidth = 2
        ctx.beginPath()
        skillPoints.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point.x, point.y)
            else ctx.lineTo(point.x, point.y)
        })
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Draw data points
        skillPoints.forEach((point) => {
            ctx.fillStyle = '#f36c3d'
            ctx.beginPath()
            ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
            ctx.fill()

            // Draw skill labels
            ctx.fillStyle = '#17211d'
            ctx.font = '12px Space Grotesk'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            const labelDistance = maxRadius + 40
            const angle = Math.atan2(point.y - centerY, point.x - centerX)
            const labelX = centerX + labelDistance * Math.cos(angle)
            const labelY = centerY + labelDistance * Math.sin(angle)
            ctx.fillText(`${point.skill.name}`, labelX, labelY)
            ctx.font = 'bold 14px Space Grotesk'
            ctx.fillStyle = '#f36c3d'
            ctx.fillText(`${point.skill.confidence}%`, labelX, labelY + 18)
        })

        // Draw center
        ctx.fillStyle = '#d8ec7b'
        ctx.beginPath()
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#17211d'
        ctx.font = 'bold 12px Space Grotesk'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('SKILL', centerX, centerY - 5)
        ctx.fillText('DNA', centerX, centerY + 8)
    }, [skills])

    return (
        <div
            ref={containerRef}
            className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 shadow-lg"
        >
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-ink mb-2">Your Skill DNA</h2>
                <p className="text-muted text-sm">Interactive visualization of your skill profile</p>
            </div>

            {/* Canvas for DNA graph */}
            <div className="mb-8 flex justify-center">
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    className="w-full max-w-md rounded-lg border border-line"
                />
            </div>

            {/* Skills breakdown */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-ink">Skills Breakdown</h3>
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="p-4 bg-white border border-line rounded-lg hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="font-semibold text-ink">{skill.name}</h4>
                                <p className="text-xs text-muted">Level {skill.level} • {skill.sources.join(', ')}</p>
                            </div>
                            <span className="text-lg font-bold text-orange">{skill.confidence}%</span>
                        </div>

                        {/* Confidence bar */}
                        <div className="w-full bg-line rounded-full h-2 mb-3 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange to-lime transition-all duration-500"
                                style={{ width: `${skill.confidence}%` }}
                            />
                        </div>

                        {/* Strengths and weaknesses */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div>
                                <p className="font-semibold text-lime mb-1">Strengths</p>
                                <ul className="space-y-1">
                                    {skill.strengths.map((s) => (
                                        <li key={s} className="text-muted">✓ {s}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-orange mb-1">Growth Areas</p>
                                <ul className="space-y-1">
                                    {skill.weaknesses.map((w) => (
                                        <li key={w} className="text-muted">⚠ {w}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Evidence tags */}
                        {skill.evidence && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {skill.evidence.certificate && (
                                    <span className="px-2 py-1 bg-lime bg-opacity-20 text-lime text-xs rounded-full">
                                        📜 Certified
                                    </span>
                                )}
                                {skill.evidence.projects && skill.evidence.projects.length > 0 && (
                                    <span className="px-2 py-1 bg-orange bg-opacity-20 text-orange text-xs rounded-full">
                                        💼 {skill.evidence.projects.length} Projects
                                    </span>
                                )}
                                {skill.evidence.teachingSessions && skill.evidence.teachingSessions.length > 0 && (
                                    <span className="px-2 py-1 bg-ink bg-opacity-10 text-ink text-xs rounded-full">
                                        👨‍🏫 Mentored
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Summary stats */}
            <div className="mt-8 pt-6 border-t border-line grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-2xl font-bold text-orange">{skills.length}</p>
                    <p className="text-xs text-muted">Total Skills</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-lime">
                        {Math.round(skills.reduce((acc, s) => acc + s.confidence, 0) / skills.length)}%
                    </p>
                    <p className="text-xs text-muted">Avg Confidence</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-ink">
                        {skills.filter((s) => s.confidence > 80).length}
                    </p>
                    <p className="text-xs text-muted">Mastered</p>
                </div>
            </div>
        </div>
    )
}
