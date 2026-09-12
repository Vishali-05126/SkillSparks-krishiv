# SkillSwap Agent Guide

## Project shape

- `backend/` is a standalone CommonJS Node HTTP service. Its main entry point is `backend/server.js`; domain logic lives in `backend/services/`.
- `frontend/` is a Next.js 14 App Router application using TypeScript, Tailwind CSS, NextAuth, and Prisma/PostgreSQL.
- The frontend uses both backend HTTP endpoints and same-origin Next.js route handlers. Check the page or route handler before changing an API contract.
- Read [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md) for setup and integration details.

## Commands

Run commands from the package directory that owns them.

### Backend

```text
cd backend
npm install
npm run dev       # node --watch server.js
npm test          # Node built-in test runner
```

### Frontend

```text
cd frontend
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
npm run build
```

The frontend needs `DATABASE_URL` and `NEXTAUTH_SECRET` from `frontend/.env.example`. Optional integrations are configured through environment variables; do not commit secrets.

## Working conventions

- Preserve the backend’s CommonJS/plain Node style and the frontend’s TypeScript App Router style. Prefer nearby patterns over introducing new abstractions.
- Backend tests use `node:test` and `node:assert/strict`; add focused coverage in `backend/test/` for backend behavior changes.
- Frontend route handlers generally use `NextResponse`, `getServerSession`, and the shared Prisma client in `frontend/lib/prisma.ts`.
- Keep changes scoped to the owning package. Update the relevant README when setup or an externally visible route changes.
- Treat `frontend/prisma/schema.prisma` as the database contract. Schema changes should include the appropriate Prisma migration and account for seed behavior.

## Important pitfalls

- Authentication is split: NextAuth uses Prisma or the local fallback in `frontend/lib/auth.ts`, while the backend uses in-memory bearer-token sessions and JSON-backed users. Do not assume a NextAuth session authenticates backend requests.
- Data is split between PostgreSQL/Prisma and backend JSON files such as `backend/data/users.json`. Confirm the data source before changing an endpoint or model.
- Backend sessions are lost on restart, and its JSON persistence is synchronous. Avoid relying on development-session state for durable behavior.
- Backend routing currently compares exact `request.url` strings; preserve or explicitly handle query-string behavior when touching routes.
- The middleware matcher protects selected authenticated frontend routes, while `/dashboard` and `/discover` have separate client-side checks. Verify both layers when changing access control.
- The Prisma seed uses `create` for projects, so repeated seeding can duplicate project records.

## Local troubleshooting

- Before diagnosing frontend auth or registration, verify PostgreSQL is reachable through `frontend/.env` `DATABASE_URL` and that Prisma has been generated/migrated.
- Run only the needed dev servers and record their actual ports: frontend is normally `3000`, an alternate Next port may be `3001`, and the backend is normally `4000`.
- When a browser reports connection refused or a backend route returns `Route not found`, check the active process and URL first, then test `/health` and the frontend URL directly.

## Validation

- For backend changes, run `cd backend; npm test` and exercise the affected endpoint when practical.
- For frontend changes, run `cd frontend; npm run build`; run Prisma commands when schema or seed code changes.
- There is currently no frontend test or lint script in `frontend/package.json`.