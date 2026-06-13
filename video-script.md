# EduTrack — Video Script (5–6 minutes)

---

## [0:00–0:30] Intro — What is EduTrack?

"Hi everyone! Today I'll walk you through **EduTrack** — a college discovery and comparison platform that helps students find, compare, and choose the best colleges across India.

The platform has 42+ curated engineering colleges from 14 states. You can search, filter by location or fees, compare colleges side-by-side, predict admissions based on your exam rank, save favorites, and even register for counseling help.

I'll show you the live application, then explain how the frontend, backend, and database work together."

---

## [0:30–1:30] Home Page — College Discovery

*(Open the app at `edutrack.vercel.app`)*

"This is the **home page**. You can see a grid of college cards — each showing the college name, location, fees, placement percentage, NAAC grade, and ownership type.

On the left is the **filter sidebar**. You can filter by:
- **Location** — 45+ cities across India
- **Fees range** — using the dual-range slider
- **NAAC grade** — A++, A+, A
- **Ownership** — Government, Private, Deemed
- **Stream** — CS, Mechanical, Civil, ENTC

The search bar at the top supports debounced live search — as you type, it waits 300ms then sends a request.

All this data comes from our **seed data** file — `seed-colleges.ts` — which has 42 enriched college entries. When the database is unavailable, we fall back to this local data.

*(Click on a college card)*"

---

## [1:30–2:15] College Detail Page

"This is the **detail page** for a college. It shows:
- A campus banner image and college logo
- The college overview with description, established year, accreditation
- **Courses table** — with duration and fees
- **Placement stats** — average CTC, highest CTC with bar charts
- **Rating breakdown** — a radar chart showing faculty, campus, placements, infrastructure, and value for money
- **Student reviews** — with pros and cons
- **Cutoff data** — by entrance exam

The charts are built with **Recharts** — they render client-side using React's `useEffect` to avoid hydration issues.

The data comes from `college-details.ts` — a local file that has enriched detail for all 42 colleges. This keeps the detail page fast — no HTTP call needed."

---

## [2:15–2:50] Compare Feature

*(Click Compare button on a card, then navigate to /compare)*

"The **compare feature** lets you select up to 2 colleges. When you click the compare button on a card, it adds it to a floating bottom bar. You can see this bar on every page.

Once you select 2 colleges, click 'Compare now' to see a full side-by-side comparison table with:
- General info (fees, ratings, accreditation)
- Placement data (average package, highest package, top recruiters)
- Courses offered
- Rating breakdown

The compare data is managed through a **Zustand store** — persisted to `sessionStorage`. This means your selection stays even if you navigate around, but clears when you close the tab.

*(If not signed in, the inline modal appears)*

If you're not signed in, the compare button shows an inline sign-in modal instead of redirecting — so you don't lose your place."

---

## [2:50–3:20] Admission Predictor

*(Navigate to /predictor)*

"The **Admission Predictor** lets you enter your exam and rank to see which colleges you might get into.

We support 6 exam types:
- **JEE Main** — targets NITs, IIITs, and GFTIs
- **JEE Advanced** — targets IITs only
- **MHT-CET** — targets Maharashtra colleges only
- **GATE** — targets MTech-relevant institutes
- **CAT** — management-qualifying colleges
- **NEET** — medical-qualifying colleges

The prediction logic is in `data-service.ts` — it matches your rank against the cutoff ranges stored in `college-details.ts`. If you're not signed in, this page redirects to login first."

---

## [3:20–3:50] Authentication System

*(Show login and register pages)*

"EduTrack uses **NextAuth.js v5** with a **Credentials provider** — users sign in with email and password. We also support **Google OAuth** optionally.

The auth flow works like this:
1. User submits credentials on the login page
2. NextAuth's Credentials provider runs the `authorize` function
3. It queries the Neon PostgreSQL database via **Prisma ORM**
4. Passwords are hashed with **bcryptjs** (12 salt rounds)
5. On success, a JWT session token is created

The session is managed client-side through NextAuth's React hooks. The `useAuth` hook provides `login`, `register`, `logout`, and session state to any component.

When you register, it first calls our `/api/auth/register` endpoint (validated with **Zod**), then auto-signs you in."

---

## [3:50–4:15] Saved Colleges

*(Show /saved page)*

"The **Saved Colleges** feature works in two layers:
- **Offline**: College IDs are saved to `localStorage` using a Zustand persist store
- **Online**: When you sign in, saved IDs sync to the Neon database via `/api/saved` endpoints

After login, the `syncLocalSaved` function in `useAuth` takes any localStorage items and POSTs them to the database. This way, nothing is lost when you go from guest to logged-in user.

The save button (heart icon) works **without** authentication — anyone can bookmark colleges. The saved page at `/saved` requires login and redirects to `/login?callbackUrl=/saved` if you're not signed in."

---

## [4:15–5:00] Architecture — How It All Connects

*(Show a diagram or the README structure)*

"Let me explain the full architecture.

**Frontend** — Next.js 16 deployed on **Vercel**:
- All pages are server-rendered with Next.js App Router
- Client components for interactive features (search, filters, compare)
- 6 API routes that run serverlessly on Vercel:
  - `/api/colleges` — search and filter
  - `/api/auth/[...nextauth]` — NextAuth handlers
  - `/api/auth/register` — user registration
  - `/api/saved` — CRUD for saved colleges
  - `/api/saved/comparisons` — CRUD for saved comparisons

**Database** — **Neon PostgreSQL** (serverless Postgres):
- Schema has 6 models: User, Account, Session, College, SavedCollege, SavedComparison
- Managed through Prisma ORM
- Prisma Client is cached in global scope to prevent connection pool exhaustion

**Backend** — **Express.js** on **Render.com** (optional, can run independently):
- Runs on port 4000
- Has a `/api/health` endpoint monitored by Uptime Robot every 5 minutes
- Serves college data from a local JSON file
- Supports search, filter, prediction, and batch lookup

The key insight: **the Next.js frontend on Vercel talks directly to Neon DB through Prisma** for auth and saved data. The Express backend is an additional API layer that provides college data independently."

---

## [5:00–5:30] Data Flow & Seed Data

"Let me explain how college data flows.

We have **3 data layers**:

1. **Local seed data** — `seed-colleges.ts` has 42 colleges with fields like name, city, state, fees, rating, NAAC grade, ownership, streams. This is always available.

2. **Local detail data** — `college-details.ts` has enriched information for each college — placement stats, courses, reviews, cutoff ranges, rating breakdowns. The detail page reads this directly — no HTTP request needed.

3. **CollegeDB API** — A third-party API for real-time college search. Used by `/api/colleges` when the API key is configured. Falls back to seed data if the API is unavailable.

The **Prisma seed** script (`prisma/seed.ts`) populates the Neon database with:
- 42 colleges from `seed-colleges.ts`
- 3 test users (alice, bob, charlie — password: Test1234)
- Sample saved colleges and comparisons

Run `npx prisma db seed` to reset the database anytime."

---

## [5:30–6:00] Deployment & Monitoring

*(Show Vercel and Render dashboards)*

"**Deployment**:

- **Frontend** → Vercel. Import the `frontend/` directory. Set env vars: `DATABASE_URL`, `AUTH_SECRET`, `COLLEGEDB_API_KEY`. The build command runs `prisma generate` then `next build`.

- **Backend** → Render.com. Point to the `backend/` directory. Build with `npm run build`, start with `npm run start`.

- **Uptime Robot** pings `/api/health` every 5 minutes — keeps the free Render instance awake and alerts us if it goes down.

Everything is configured in `vercel.json` and `render.yaml` in the repository.

That's EduTrack! A full-stack college discovery platform with Next.js, Prisma, Neon Postgres, and Express. Thanks for watching!"

---

## Appendix — Timestamp Summary

| Timestamp | Topic |
|---|---|
| 0:00–0:30 | Intro & overview |
| 0:30–1:30 | Home page — search, filters, seed data |
| 1:30–2:15 | College detail page — charts, data flow |
| 2:15–2:50 | Compare feature — Zustand store, auth guard |
| 2:50–3:20 | Admission predictor — 6 exam types |
| 3:20–3:50 | Authentication — NextAuth, Prisma, bcrypt |
| 3:50–4:15 | Saved colleges — localStorage + DB sync |
| 4:15–5:00 | Architecture — frontend, backend, DB |
| 5:00–5:30 | Data flow & seed data |
| 5:30–6:00 | Deployment & monitoring |
