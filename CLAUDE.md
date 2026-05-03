@AGENTS.md

# Savings App

## Tech Stack

- Next.js 16, TypeScript, Prisma, PostgreSQL (Supabase)
- Better Auth for authentication + organization plugin
- Inngest for background jobs
- Resend for emails
- Tailwind CSS + shadcn/ui
- Upstash Redis for rate limiting

## Project Structure

- features/ - all feature modules
- lib/ - shared utilities
- path.ts - all route helpers

## Notes

- Use getAuthOrRedirect for protected pages
- Organization plugin handles RBAC (owner, admin, member)
- All server actions use fromErrorToActionState for error handling
