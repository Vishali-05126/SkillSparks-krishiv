'use client'

import { useState } from 'react'

export default function SessionsPage() {
    const configured = Boolean(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
    const [booked, setBooked] = useState('')
    return <main className="section app-page"><div className="page-intro"><p className="eyebrow">Mentorship sessions</p><h1>Make time<br /><span>to learn.</span></h1><p className="lede">Book focused one-to-one or group sessions with people who have already done the work.</p></div><div className="project-grid"><article className="surface project-card"><span className="status">Available today</span><h3>Product design critique</h3><p>30 minutes with Maya, a product designer who helps students sharpen their case studies.</p><button className="button button-orange" type="button" onClick={() => setBooked('Product design critique booked for your next open slot.')}>{booked ? 'Booked' : 'Book a session'} <span>→</span></button></article><article className="surface project-card"><span className="status">Community session</span><h3>React patterns for beginners</h3><p>A practical group session for turning components into a small working interface.</p><button className="button button-orange" type="button" onClick={() => setBooked('React patterns session added to your schedule.')}>{booked ? 'Added' : 'Join session'} <span>→</span></button></article><article className="surface project-card"><span className="status">Your next step</span><h3>Session workspace</h3><p>Bookings, notes, and follow-up actions stay together so learning continues after the call.</p><span className="state">{booked || (configured ? 'Stripe test mode is configured.' : 'Local booking mode is active. Add Stripe for payments.')}</span></article></div></main>
}
