import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { localPosts } from '@/lib/localContent'

export async function GET(request: Request) {
    const tags = new URL(request.url).searchParams.get('tag')?.trim()
    try {
        const posts = await prisma.post.findMany({
            where: tags ? { tags: { has: tags } } : undefined,
            include: { user: { select: { id: true, name: true, avatarUrl: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50,
        })
        return NextResponse.json({ posts })
    } catch {
        const posts = tags ? localPosts.filter((post) => post.tags.includes(tags)) : localPosts
        return NextResponse.json({ posts, localFallback: true })
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) return NextResponse.json({ error: 'Sign in required.' }, { status: 401 })
    const body = await request.json()
    const caption = String(body.caption || '').trim()
    const type = String(body.type || 'POST')
    const tags = Array.isArray(body.tags) ? body.tags.map(String).map((tag: string) => tag.trim()).filter(Boolean) : []
    if (!caption || !['HIGHLIGHT', 'POST', 'TALENT', 'MEME'].includes(type)) return NextResponse.json({ error: 'Caption and post type are required.' }, { status: 400 })
    try {
        const post = await prisma.post.create({ data: { userId: session.user.id, caption, type: type as 'HIGHLIGHT' | 'POST' | 'TALENT' | 'MEME', mediaUrl: body.mediaUrl ? String(body.mediaUrl) : undefined, tags } })
        return NextResponse.json({ post }, { status: 201 })
    } catch {
        localPosts.unshift({ id: `local-post-${Date.now()}`, caption, type, tags, createdAt: new Date().toISOString(), user: { name: session.user.name || 'You' } })
        return NextResponse.json({ post: localPosts[0], localFallback: true }, { status: 201 })
    }
}
