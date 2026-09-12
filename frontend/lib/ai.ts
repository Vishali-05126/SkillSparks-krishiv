type AiMessage = { role: 'system' | 'user'; content: string }

export type AiResult = { text: string; provider: 'openai' | 'profile-rules' }

export async function askAi(messages: AiMessage[], options: { maxTokens?: number; json?: boolean } = {}): Promise<AiResult | null> {
    const apiKey = String(process.env.OPENAI_API_KEY || '').trim()
    if (!apiKey) return null
    try {
        const response = await fetch(`${String(process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')}/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.2, max_tokens: options.maxTokens || 350, ...(options.json ? { response_format: { type: 'json_object' } } : {}), messages }),
        })
        const data = await response.json().catch(() => ({}))
        const text = data.choices?.[0]?.message?.content?.trim()
        return response.ok && text ? { text, provider: 'openai' } : null
    } catch { return null }
}

const ROLE_ROADMAPS: Array<{ terms: string[]; skills: string[] }> = [
    { terms: ['frontend', 'react', 'web developer'], skills: ['HTML & CSS', 'JavaScript', 'React', 'TypeScript', 'Testing', 'Portfolio'] },
    { terms: ['data', 'analyst'], skills: ['SQL', 'Statistics', 'Python', 'Data Visualization', 'Portfolio'] },
    { terms: ['machine learning', 'ai engineer', 'ml'], skills: ['Python', 'Statistics', 'Machine Learning', 'Model Evaluation', 'Projects'] },
    { terms: ['design', 'ux', 'ui'], skills: ['UX Research', 'Visual Design', 'Prototyping', 'User Testing', 'Case Studies'] },
    { terms: ['cloud', 'devops'], skills: ['Linux', 'Networking', 'Cloud Fundamentals', 'CI/CD', 'Infrastructure as Code'] },
    { terms: ['cyber', 'security'], skills: ['Networking', 'Linux', 'Security Fundamentals', 'Threat Modeling', 'Hands-on Labs'] },
]

export type SkillGap = { skill: string; priority: 'High' | 'Medium' | 'Low'; reason: string; estimatedHours: number }

export function ruleBasedSkillGap(goal: string, currentSkills: string[]): SkillGap[] {
    const normalizedGoal = goal.toLowerCase()
    const roadmap = ROLE_ROADMAPS.find((item) => item.terms.some((term) => normalizedGoal.includes(term)))?.skills || ['Communication', 'Project Planning', 'Portfolio Building']
    const known = new Set(currentSkills.map((skill) => skill.trim().toLowerCase()))
    return roadmap.filter((skill) => !known.has(skill.toLowerCase())).slice(0, 6).map((skill, index) => ({ skill, priority: index < 2 ? 'High' : index < 4 ? 'Medium' : 'Low', estimatedHours: index < 2 ? 20 : index < 4 ? 14 : 8, reason: `${skill} is a common foundation for the stated goal: ${goal}. Validate this recommendation against the role description you are targeting.` }))
}

export function validateSkillGaps(value: unknown, goal: string, currentSkills: string[]): SkillGap[] {
    const candidate = (value as { missingSkills?: unknown })?.missingSkills
    if (!Array.isArray(candidate)) return ruleBasedSkillGap(goal, currentSkills)
    const known = new Set(currentSkills.map((skill) => skill.trim().toLowerCase()))
    const cleaned = candidate.map((item: any, index) => ({ skill: String(item?.skill || '').trim(), priority: ['High', 'Medium', 'Low'].includes(item?.priority) ? item.priority : index < 2 ? 'High' : 'Medium', estimatedHours: Math.max(1, Math.min(200, Number(item?.estimatedHours) || (index < 2 ? 20 : 12))), reason: String(item?.reason || '').trim() })).filter((item) => item.skill && item.reason && !known.has(item.skill.toLowerCase())).slice(0, 6)
    return cleaned.length ? cleaned : ruleBasedSkillGap(goal, currentSkills)
}
