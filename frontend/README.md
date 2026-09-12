# SkillSwap

SkillSwap is a peer-to-peer skill exchange and mentorship MVP built with Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and NextAuth.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` plus a long `NEXTAUTH_SECRET`.
2. Run `npm install`.
3. Run `npm run prisma:generate`.
4. Run `npm run prisma:migrate -- --name init`.
5. Run `npm run prisma:seed`.
6. Run `npm run dev`.

## Production deployment

Deploy the `frontend/` service with Node.js 18+ and a managed PostgreSQL database. Set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` to the public HTTPS application URL. Before serving a release, run `npm run prisma:deploy`; the production build runs `prisma generate` automatically.

The signed-in application uses Next.js API routes plus Prisma as its source of truth. The standalone `backend/` service can be deployed separately for its health and optional AI endpoints, but authenticated matching, connections, profiles, and the AI Coach do not depend on its separate in-memory token sessions.

Demo account after seeding: `demo@skillswap.local` / `password123`.

Optional integrations are enabled by environment variables: Google OAuth, OpenAI skill-gap analysis, Stripe test checkout, Cloudinary uploads, and Daily video rooms. The app shows setup guidance when an integration is not configured.

## MVP routes

- `/login`, `/register`, `/profile`
- `/feed` with Prisma-backed posts and skill filtering
- `/projects` with difficulty filters
- `/teams` with authenticated team creation
- `/rooms` and `/rooms/[topic]`
- `/sessions` integration readiness surface
- `/skill-gap` AI integration readiness and analysis form
