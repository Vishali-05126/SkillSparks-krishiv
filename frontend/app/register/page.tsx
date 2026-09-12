'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
            const result = await response.json()

            if (response.ok) {
                const login = await import('next-auth/react').then(({ signIn }) => signIn('credentials', { email, password, redirect: false }))
                if (login?.error) setError('Account created, but sign in failed. Please sign in.')
                else router.push('/profile')
            } else {
                setError(result.error || 'Registration failed. Please try again.')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
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
                    <a href="/login">Login</a>
                </nav>
            </header>

            <section className="auth-section">
                <div className="auth-container">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <h1>Join the community</h1>
                            <p>Create your SkillSwap account and start swapping</p>
                        </div>

                        <form onSubmit={handleRegister} className="auth-form">
                            {error && <p className="error-message">{error}</p>}

                            <div className="form-group">
                                <label htmlFor="name">Full name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    required
                                />
                            </div>

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

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                className="button button-orange auth-submit"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Creating account...' : 'Create account'} <span>→</span>
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Already have an account?{' '}
                                <a href="/login" className="text-link">
                                    Sign in <span>→</span>
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="auth-illustration">
                        <div className="orbit orbit-one" />
                        <div className="orbit orbit-two" />
                        <div className="art-center">
                            S<br />
                            <small>swap</small>
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
