import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import Topbar from '@/components/Topbar'

export const metadata = { title: 'SkillSwap AI Connect', description: 'Trade what you know. Unlock what is next.' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><AuthProvider><Topbar />{children}</AuthProvider></body></html>
}