# SkillSwap Backend

Small standalone Node.js backend service for the SkillSwap project.

## Run

```bash
cd backend
npm run dev
```

Endpoints:

- `GET /health`
- `GET /api/projects`
- `POST /api/contact` with `{ "name": "...", "email": "...", "message": "..." }`

Contact messages are validated and stored in `backend/data/contacts.json`.

## AI configuration

To enable the AI feature, set the following environment variables before starting the backend:

```bash
$env:OPENAI_API_KEY="your-openai-key"
$env:OPENAI_MODEL="gpt-4o-mini"
$env:OPENAI_BASE_URL="https://api.openai.com/v1"
```

You can also place these in a `.env` file and load them with your preferred process manager.

## Frontend connection

The frontend defaults to `http://localhost:4000`. To restrict browser access in production, set `FRONTEND_URL` to the deployed frontend origin.