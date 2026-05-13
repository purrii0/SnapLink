# SnapLink

Production-grade URL shortener with real-time analytics — built to demonstrate backend engineering depth

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat) ![Redis](https://img.shields.io/badge/Redis-DD0031?style=flat) ![BullMQ](https://img.shields.io/badge/BullMQ-6C47FF?style=flat) ![WebSockets](https://img.shields.io/badge/WebSockets-1D9E75?style=flat) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat)


## What it does

**URL shortening** — Generate short codes with custom aliases, expiry dates, and per-link password protection

**Click analytics** — Every click tracked: IP geolocation, device, browser, referrer, timestamp, country

**Real-time dashboard** — Live click feed via WebSockets. Dashboard updates the moment someone clicks your link

**Rate limiting** — Per-IP rate limiting via Redis sliding window. Blocks abuse without touching the DB

**Async event queue** — Click events processed via BullMQ. Redirect is instant, analytics processing is async

**Analytics API** — Filter by date range, country, device. Cursor-based pagination with proper SQL indexes


## Request flow

```
GET /:code
  → Redis cache lookup
  → 302 redirect
  → BullMQ enqueue
  → Worker processes
  → PostgreSQL write
  → WebSocket broadcast
```


## Stack & why

| Tool | Why |
|
| Fastify | 2x faster than Express |
| PostgreSQL | Relational analytics queries |
| Redis | Sub-ms URL lookups + rate limiting |
| BullMQ | Async click processing at scale |
| WebSockets | Real-time dashboard updates |
| Prisma | Typed DB queries, safe migrations |
| Zod | Runtime request validation |
| Docker Compose | One command local setup |


## API

```
# URL management
POST   /api/links              create short link
GET    /api/links              list links (cursor pagination)
DELETE /api/links/:code        delete link

# Redirect
GET    /:code                  redirect + async track

# Analytics
GET    /api/links/:code/stats  click stats with filters
GET    /api/links/:code/clicks paginated click events

# Real-time
WS     /ws                     live click feed
```
