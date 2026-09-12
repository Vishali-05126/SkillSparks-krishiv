import { NextResponse } from 'next/server'
import { askAi, ruleBasedSkillGap, validateSkillGaps } from '@/lib/ai'

export async function POST(request: Request) {
    const body = await request.json()
    const goal = String(body.goal || '').trim()
    const currentSkills = Array.isArray(body.currentSkills) ? body.currentSkills.map(String) : []
    if (!goal) return NextResponse.json({ error: 'A target role or skill is required.' }, { status: 400 })
    const fallback = ruleBasedSkillGap(goal, currentSkills)
    const result = await askAi([{ role: 'system', content: 'You are a career-learning analyst. Return only JSON: {"missingSkills":[{"skill":"string","priority":"High|Medium|Low","estimatedHours":number,"reason":"specific short reason"}]}. Use only well-established foundational skills. Do not claim job-market facts, guarantees, or knowledge of a particular employer. Exclude skills the user already has.' }, { role: 'user', content: JSON.stringify({ goal, currentSkills }) }], { json: true })
    if (!result) return NextResponse.json({ missingSkills: fallback, engine: 'profile-rules', message: 'Showing a role-based roadmap. Configure OPENAI_API_KEY for a more tailored analysis.' })
    let parsed: unknown
    try { parsed = JSON.parse(result.text) } catch { parsed = null }
    return NextResponse.json({ missingSkills: validateSkillGaps(parsed, goal, currentSkills), engine: result.provider, message: 'AI suggestions are grounded in your provided skills; verify them against the requirements of your target role.' })
}
