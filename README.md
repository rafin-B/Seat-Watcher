
# Seat Watcher (Next.js + Vercel Cron)

- Google login (NextAuth)
- Watchlist saved in Postgres (Prisma)
- Every minute, Vercel Cron hits `/api/cron/seat-check`
- On change, sends one email per user (Resend), with all changed items

## Quick start

1) **Create Postgres** (Neon/Supabase/Aiven). Copy the connection string to `DATABASE_URL`.

2) **Create a Resend key** (https://resend.com) and a verified sender (e.g., `alerts@yourdomain.com`).  
   Put `RESEND_API_KEY` and `EMAIL_FROM` in `.env.local`.

3) **Create a Google OAuth app** (https://console.cloud.google.com/apis/credentials).  
   - Authorized JS origin: `https://<your-vercel-domain>` (and `http://localhost:3000`)
   - Authorized redirect URI: `https://<your-vercel-domain>/api/auth/callback/google` (and `http://localhost:3000/api/auth/callback/google`)

   Put `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET` in `.env.local`.

4) **Install & push schema**
```bash
npm i
npm run prisma:push
npm run dev
```

5) **Deploy to Vercel**
- Add Environment Variables in Vercel dashboard (same as `.env.local`)
- Deploy; `vercel.json` already defines a 1-min cron hitting `/api/cron/seat-check`

## API used
`https://connect.bracu.ac.bd/api/adv/v1/advising/sections/seat-status`

## Notes
- We track `lastFree` per watch item to avoid repeat emails
- Faculty filter matches exact string in `faculties` if provided
- The cron endpoint fetches once per minute for all users to stay polite and fast


## Live (instant) email mode
- Open the site, sign in, and click **Start Live**. Keep the tab open.
- The browser will poll the BRACU API every N seconds (you choose) and call `/api/notify` immediately on changes.
- This gives you near-instant emails while your tab is open.
- The server-side cron (every minute) remains as a fallback when the tab is closed.
