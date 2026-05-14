# NestJS Advance Concepts

This project demonstrates practical NestJS advanced patterns with a real PostgreSQL database, Prisma ORM, and Docker-based local development.

## Features

- NestJS 11 application with modular architecture (`AppModule`, `UsersModule`, `DatabaseModule`)
- Prisma 7 integration using `@prisma/adapter-pg` and generated client in `generated/prisma`
- User CRUD endpoints with Prisma-backed persistence
- Global request validation via `ValidationPipe` (`transform`, `whitelist`, `forbidNonWhitelisted`)
- DTO-based input validation using `class-validator`
- Route-level authorization guard (`MockAuthGuard`) for write operations
- Global response interceptor that wraps responses with metadata
- Global request logging middleware for incoming HTTP traffic
- Config management with `@nestjs/config` + Zod schema validation
- Docker Compose stack with API + PostgreSQL + pgAdmin
- E2E testing setup using Jest + Supertest

## Tech Stack

- NestJS 11
- TypeScript
- Prisma 7
- PostgreSQL 16
- Docker / Docker Compose
- Zod
- Jest + Supertest

## API Behavior Summary

### Users Endpoints

- `POST /users` (guarded)
- `GET /users`
- `GET /users/:id`
- `PATCH /users/:id` (guarded)
- `DELETE /users/:id`

For guarded routes (`POST`, `PATCH`), include:

```http
Authorization: Bearer mock-token
```

### Global Response Shape

All successful responses are wrapped by the response interceptor:

```json
{
    "success": true,
    "data": {},
    "timestamp": "2026-05-14T00:00:00.000Z"
}
```

## Environment Variables

Create a `.env` file (or provide env vars in your shell):

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
PORT=3000
NODE_ENV=development

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

PGADMIN_PORT=5050
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin
```

## Running with Docker

1. Build and start services:

```sh
docker compose up --build --watch -d
```

1. Service URLs:

- API: <http://localhost:3000>
- PostgreSQL: localhost:5432
- pgAdmin: <http://localhost:5050>

## Running Locally (Without Docker)

1. Install dependencies:

```sh
npm install
```

1. Ensure PostgreSQL is running and `DATABASE_URL` is set.

2. Apply migrations:

```sh
npx prisma migrate dev
```

1. Start dev server:

```sh
npm run start:dev
```

## Useful Scripts

- `npm run build` - Build the app
- `npm run start` - Start app
- `npm run start:dev` - Start in watch mode
- `npm run lint` - Run ESLint with auto-fix
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests

## Project Structure

- `src/` - Application source code
- `prisma/` - Prisma schema and migrations
- `generated/prisma/` - Generated Prisma client output
- `test/` - End-to-end tests
- `docker-compose.yml` - API + DB + pgAdmin services
- `Dockerfile` - API image for development

## Notes

- CORS is enabled for `http://localhost:5173`.
- `ParseIntPipe` is used for `:id` route params.
- The `User` model currently enforces unique `email` and unique `name`.

## Reference Material

- <https://github.com/prisma/nestjs-workshop-prisma-day-22/tree/main>
