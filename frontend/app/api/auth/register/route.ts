import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { publicLocalUser, readLocalUsers, writeLocalUsers } from '@/lib/localUsers'

export async function POST(request: Request) {
    let name = ''
    let email = ''
    let password = ''
    try {
        const body = await request.json()
        name = String(body.name || '').trim()
        email = String(body.email || '').trim().toLowerCase()
        password = String(body.password || '')

        if (!name || !email || password.length < 6) {
            return NextResponse.json({ error: 'Name, valid email, and a password of at least 6 characters are required.' }, { status: 400 })
        }

        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })

        const passwordHash = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({ data: { name, email, passwordHash } })
        return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 })
    } catch (error) {
        console.warn('PostgreSQL unavailable; using local development user storage.', error)
        const users = readLocalUsers()
        if (users.some((user) => user.email.toLowerCase() === email)) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
        const user = { id: `local_${Date.now()}`, name, email, passwordHash: await bcrypt.hash(password, 12), skills: [], lookingFor: [], bio: '' }
        users.push(user)
        writeLocalUsers(users)
        return NextResponse.json({ user: publicLocalUser(user), localFallback: true }, { status: 201 })
    }
}
