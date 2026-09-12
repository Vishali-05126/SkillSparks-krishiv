'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        setLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (!result?.error) {
                router.push('/profile')
            } else {
                setError(result?.error === 'Configuration' ? 'The database is unavailable. Start PostgreSQL or set DATABASE_URL, then try again.' : 'Invalid email or password.')
            }
        } catch {
            setError('Unable to sign in. Check your database configuration.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main>
            <header className="topbar">
                <a className="brand" href="/">
                    <span className="brand-mark">↗</span> SkillSwap <em>AI</em>
                </a>
                <nav>
                    <a href="/">Home</a>
                    <a href="/register">Register</a>
                </nav>
            </header>

            <section className="auth-section">
                <div className="auth-container">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <h1>Welcome back</h1>
                            <p>Sign in to your SkillSwap account</p>
                        </div>

                        <form onSubmit={handleLogin} className="auth-form">
                            {error && <p className="error-message">{error}</p>}

                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                className="button button-orange auth-submit"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing in...' : 'Sign in'} <span>→</span>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don't have an account?{' '}
                                <a href="/register" className="text-link">
                                    Create one <span>→</span>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="auth-illustration">
                        <div className="orbit orbit-one" />
                        <div className="orbit orbit-two" />
                        <div className="art-center">
                            S<br />
                            <small>login</small>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <a className="brand" href="/">
                    <span className="brand-mark">↗</span> SkillSwap <em>AI</em>
                </a>
                <span>Learn loudly. Share generously.</span>
                <span>© 2026 SkillSwap</span>
            </footer>
        </main>
    )
}
