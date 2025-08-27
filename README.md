## Notes
- We track `lastFree` per watch item to avoid repeat emails
- Faculty filter matches exact string in `faculties` if provided
- The cron endpoint fetches once per minute for all users to stay polite and fast


## Live (instant) email mode
- Open the site, sign in, and click **Start Live**. Keep the tab open.
- The browser will poll the BRACU API every N seconds (you choose) and call `/api/notify` immediately on changes.
- This gives you near-instant emails while your tab is open.
- The server-side cron (every minute) remains as a fallback when the tab is closed.
