import fs from 'node:fs'
import path from 'node:path'

type LocalUser = {
    id: string
    name: string
    email: string
    password?: string
    passwordHash?: string
    skills?: string[]
    lookingFor?: string[]
    bio?: string
    [key: string]: unknown
}

const usersFile = path.join(process.cwd(), '..', 'backend', 'data', 'users.json')

export function readLocalUsers(): LocalUser[] {
    if (!fs.existsSync(usersFile)) return []
    try { return JSON.parse(fs.readFileSync(usersFile, 'utf8')) as LocalUser[] } catch { return [] }
}

export function writeLocalUsers(users: LocalUser[]) {
    fs.mkdirSync(path.dirname(usersFile), { recursive: true })
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2))
}

export function publicLocalUser(user: LocalUser) {
    const { password, passwordHash, ...safeUser } = user
    return safeUser
}
