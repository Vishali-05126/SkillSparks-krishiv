'use client'

import { FormEvent, useEffect, useState } from 'react'

type Post = { id: string; caption: string; type: string; tags: string[]; createdAt: string; user: { name: string; avatarUrl?: string | null } }

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [caption, setCaption] = useState('')
    const [type, setType] = useState('POST')
    const [tag, setTag] = useState('')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(true)

    async function loadFeed() {
        setLoading(true)
        const response = await fetch(`/api/feed${tag ? `?tag=${encodeURIComponent(tag)}` : ''}`)
        const result = await response.json()
        setPosts(result.posts || [])
        setStatus(result.error || '')
        setLoading(false)
    }

    useEffect(() => { loadFeed() }, [tag])

    async function createPost(event: FormEvent) {
        event.preventDefault()
        setStatus('')
        const response = await fetch('/api/feed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ caption, type, tags: tag ? [tag] : [] }) })
        const result = await response.json()
        if (!response.ok) { setStatus(result.error || 'Unable to create post.'); return }
        setCaption('')
        await loadFeed()
    }

    return <main className="section app-page">
        <div className="page-intro"><p className="eyebrow">SkillSwap community</p><h1>Learn in public.<br /><span>Find your people.</span></h1><p className="lede">Share progress, ask for feedback, and discover practical ways to exchange what you know.</p></div>
        <div className="app-grid">
            <form className="surface compose-form" onSubmit={createPost}><div className="surface-heading"><h2>Share an update</h2><span>01</span></div><select value={type} onChange={(event) => setType(event.target.value)}><option value="POST">Post</option><option value="HIGHLIGHT">Highlight</option><option value="TALENT">Talent</option><option value="MEME">Meme</option></select><textarea required value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="What are you learning or building?" /><input value={tag} onChange={(event) => setTag(event.target.value)} placeholder="Skill tag, e.g. React" /><button className="button button-orange" type="submit">Publish update <span>→</span></button></form>
            <div className="feed-list"><div className="feed-toolbar"><h2>Latest from the community</h2><input value={tag} onChange={(event) => setTag(event.target.value)} placeholder="Filter by skill" /></div>{loading ? <p className="state">Loading posts...</p> : posts.length ? posts.map((post) => <article className="surface post-card" key={post.id}><div className="post-meta"><strong>{post.user.name}</strong><span>{post.type}</span></div><p>{post.caption}</p><div className="tags">{post.tags.map((postTag) => <span key={postTag}>{postTag}</span>)}</div></article>) : <div className="surface empty-state"><strong>No posts yet</strong><span>{status || 'Be the first person to share a learning moment.'}</span></div>}</div>
        </div>
    </main>
}
