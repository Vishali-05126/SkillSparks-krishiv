import { PrismaClient, ProjectLevel } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const skills = [
    ['React', 'Web Development'], ['Python', 'Programming'], ['Product Design', 'Design'],
    ['Public Speaking', 'Communication'], ['UX Research', 'Design'], ['Data Science', 'Programming'],
    ['Writing', 'Communication'], ['Video Editing', 'Media'], ['Marketing', 'Business'],
]

const projects: Array<[string, string, ProjectLevel]> = [
    ['Build a personal portfolio', 'Create a thoughtful portfolio with a case study and a clear point of view.', ProjectLevel.BEGINNER],
    ['Community recipe exchange', 'Design and build a small recipe-sharing experience for a local community.', ProjectLevel.BEGINNER],
    ['Climate habits dashboard', 'Turn household sustainability data into a useful weekly decision tool.', ProjectLevel.INTERMEDIATE],
    ['Peer learning marketplace', 'Prototype matching, scheduling, and trust signals for skill exchange.', ProjectLevel.INTERMEDIATE],
    ['Open source mentor network', 'Build a scalable platform for volunteer mentors and learning circles.', ProjectLevel.ADVANCED],
]

async function main() {
    for (const [name, category] of skills) await prisma.skill.upsert({ where: { name }, update: { category }, create: { name, category } })
    for (const [title, description, level] of projects) await prisma.project.create({ data: { title, description, level, resourceLinks: [] } })
    const passwordHash = await bcrypt.hash('password123', 12)
    await prisma.user.upsert({ where: { email: 'demo@skillswap.local' }, update: {}, create: { name: 'Demo Mentor', email: 'demo@skillswap.local', passwordHash, bio: 'I help people turn ideas into useful products.', role: 'BOTH' } })
    for (const topic of ['Web Development', 'UI/UX Design', 'Data Structures', 'Public Speaking']) {
        await prisma.room.upsert({ where: { topic }, update: {}, create: { topic, description: `A focused room for ${topic} learners and mentors.` } })
    }
}

main().finally(() => prisma.$disconnect())
