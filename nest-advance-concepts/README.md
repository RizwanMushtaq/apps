# NestJS Advance Concepts

This project demonstrates advanced concepts in a NestJS application, including Docker-based development and integration with PostgreSQL.

## Features

- NestJS 11.x application
- Dockerized setup for API and PostgreSQL database
- Hot-reload support in development mode

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose v2+

### Running the App

1. Build and start all services:

    ```sh
    docker compose up --build --watch -d
    ```

2. The API will be available at [http://localhost:3000](http://localhost:3000)
3. PostgreSQL will be available at port 5432 (default user/password: postgres)
4. pgAdmin is available at [http://localhost:5050](http://localhost:5050) (default: <admin@example.com> / admin)

### Development

- The API runs in watch mode for hot-reloading.
- Source code changes in `src/` should trigger reloads (see docker-compose.yml for details).

## Project Structure

- `src/` – Application source code
- `test/` – End-to-end tests
- `Dockerfile` – Docker build instructions
- `docker-compose.yml` – Multi-service orchestration

## Reference Material

- <https://github.com/prisma/nestjs-workshop-prisma-day-22/tree/main>
