# URL Shortener

A production-minded URL shortener backend in Node.js + TypeScript — REST API, Postgres, Prisma, and structured request logging with pino. Built to stay stateless and grow into caching, rate limiting, and horizontal scaling.

## Features

- Create short links via REST API
- Redirect short codes to original URLs (`302`)
- Click counting on each redirect
- Input validation with Zod
- Structured HTTP logging with request IDs (`pino-http`)
- Typed database access with Prisma + PostgreSQL

## Stack

| Layer | Choice |
|-------|--------|
| Runtime | Node.js + TypeScript |
| HTTP | Express |
| ORM / DB | Prisma 7 + PostgreSQL |
| Logging | pino-http |
| Validation | Zod |

## Project structure

```text
src/
  index.ts          # App entry, middleware, route mounting
  database.ts       # Prisma client + Postgres adapter
  routes/
    links.ts        # POST /api/links, GET /:shortId
prisma/
  schema.prisma     # Link model
  migrations/       # SQL migrations
prisma7.config.ts   # Prisma 7 datasource config
.env.example        # Documented environment variables