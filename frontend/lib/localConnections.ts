import fs from 'node:fs'
import path from 'node:path'

export type LocalConnection = { id: string; senderId: string; recipientId: string; message?: string; status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED'; createdAt: string; respondedAt?: string }

const connectionsFile = path.join(process.cwd(), '..', 'backend', 'data', 'connections.json')

export function readLocalConnections(): LocalConnection[] {
    if (!fs.existsSync(connectionsFile)) return []
    try { return JSON.parse(fs.readFileSync(connectionsFile, 'utf8')) as LocalConnection[] } catch { return [] }
}

export function writeLocalConnections(connections: LocalConnection[]) {
    fs.mkdirSync(path.dirname(connectionsFile), { recursive: true })
    fs.writeFileSync(connectionsFile, JSON.stringify(connections, null, 2))
}
