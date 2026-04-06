# server

To install dependencies:

```bash
npm install
```

To run:

```bash
npm run dev
```

## Automatic ISR Revalidation (Optional)

After each successful content save, the server can call your outsource website
revalidation endpoint so cached pages refresh without rebuilding.

Add these environment variables to `server/.env`:

```env
OUTSOURCE_REVALIDATE_ENABLED=true
OUTSOURCE_REVALIDATE_URL=https://your-outsource-site.com/api/revalidate
OUTSOURCE_REVALIDATE_SECRET=<your revalidate secret>
OUTSOURCE_REVALIDATE_TIMEOUT_MS=8000

```

Notes:

- Revalidation calls are non-blocking for data integrity: content is still saved
  in MongoDB even if revalidation fails.
- If your outsource route expects different model keys, set the
  `OUTSOURCE_REVALIDATE_MODEL_*` values to match your route mapping.
