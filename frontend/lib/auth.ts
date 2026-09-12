import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { readLocalUsers } from './localUsers'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: { signIn: '/login' },
    providers: [
        CredentialsProvider({
            name: 'Email and password',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null
                let user
                try {
                    user = await prisma.user.findUnique({ where: { email: credentials.email.toLowerCase().trim() } })
                } catch (error) {
                    const localUser = readLocalUsers().find((candidate) => candidate.email.toLowerCase() === credentials.email!.toLowerCase().trim())
                    const valid = localUser && (localUser.password === credentials.password || (localUser.passwordHash && await bcrypt.compare(credentials.password, localUser.passwordHash)))
                    if (!valid || !localUser) return null
                    return { id: localUser.id, name: localUser.name, email: localUser.email }
                }
                if (!user?.passwordHash || !(await bcrypt.compare(credentials.password, user.passwordHash))) return null
                return { id: user.id, name: user.name, email: user.email, image: user.avatarUrl }
            },
        }),
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET })]
            : []),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id
            return token
        },
        async session({ session, token }) {
            if (session.user) session.user.id = String(token.id || token.sub)
            return session
        },
    },
}
