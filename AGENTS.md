<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:edutrack-project -->
# EduTrack Project

## Data Sources
- **CollegeDB API** (`lib/college-api.ts`) — real-time college search via `COLLEGEDB_API_KEY` env var
- **Local seed data** (`data/seed-colleges.ts`) — 15 curated engineering colleges with enriched data
- **Local detail data** (`data/college-details.ts`) — placement, courses, reviews, cutoffs for all seed colleges

## Architecture
- Monorepo with `frontend/` workspace
- No Express backend — data is served via Next.js API routes + local data modules
- `data-service.ts` reads locally; no HTTP calls needed for detail/compare/predictor pages
- State managed via Zustand stores (no React Context for state)

## Key Files
- `lib/college-api.ts` — CollegeDB API client with in-memory cache
- `app/api/colleges/route.ts` — search/filter endpoint (API-first, seed fallback)
- `data/college-details.ts` — unified detail records for all 15 colleges

## Environment
- `COLLEGEDB_API_KEY` — required in `.env.local` for real-time college search
<!-- END:edutrack-project -->
