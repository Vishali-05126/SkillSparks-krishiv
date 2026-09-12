import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { localProjects } from '@/lib/localContent'

export async function GET(request: Request) {
    const level = new URL(request.url).searchParams.get('level')
    try {
        const projects = await prisma.project.findMany({ where: level ? { level: level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' } : undefined, orderBy: { title: 'asc' } })
        return NextResponse.json({ projects })
    } catch {
        const projects = level ? localProjects.filter((project) => project.level === level) : localProjects
        return NextResponse.json({ projects, localFallback: true })
    }
}
