'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Topbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    // The public landing page owns its own header and footer navigation.
    if (!session?.user || pathname === '/') return null

    return (
        <header className="lovable-header">
            <Link className="lovable-logo" href="/">
                <span className="lovable-logo-mark">✦</span><strong>SkillSwap</strong> <span>AI</span>
            </Link>
            <nav className="lovable-nav">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/coach">AI Coach</Link>
                <Link href="/discover">Discover</Link>
                <Link href="/connections">Connections</Link>
                <Link href="/feed">Communities</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/sessions">Mentors</Link>
            </nav>
            <div className="lovable-header-actions">
                <Link className="lovable-small-button" href="/profile">Profile <span>↗</span></Link>
                <button className="lovable-small-button" type="button" onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
            </div>
        </header>
    )
}
