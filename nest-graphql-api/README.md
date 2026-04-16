# Nest GraphQL API

A NestJS GraphQL API with a Cats module using code-first schema generation.

## Features

- GraphQL integration with `@nestjs/graphql` and Apollo driver.
- Auto-generated schema output at `src/schema.gql`.
- Cats module with:
  - Query: `cats`
  - Mutation: `createCat`
- In-memory storage for cats (resets on app restart).
- Starter REST route `GET /` returning `Hello World!`.

## Tech Stack

- NestJS 11
- GraphQL (`@nestjs/graphql`, `@nestjs/apollo`, `@apollo/server`)
- TypeScript
- Jest + Supertest

## Project Structure

```text
src/
 app.module.ts
 main.ts
 schema.gql
 cats/
  cats.module.ts
  cats.resolver.ts
  cats.service.ts
 dto/
  create-cat.input.ts
 models/
  Cat.model.ts
test/
 app.e2e-spec.ts
```

## GraphQL Endpoint

- `http://localhost:3000/graphql`

## GraphQL Operations

### Query all cats

```graphql
query {
  cats {
    id
    name
    age
    breed
  }
}
```

### Create a cat

```graphql
mutation {
  createCat(createCatInput: { name: "Milo", age: 2, breed: "Siamese" }) {
    id
    name
    age
    breed
  }
}
```

## Setup

```bash
npm install
```

## Run the App

```bash
# development mode
npm run start:dev

# production build
npm run build

# production start
npm run start:prod
```

## How to Test the App

### Run unit tests

```bash
npm run test
```

### Run unit tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:cov
```

### Run e2e tests

```bash
npm run test:e2e
```

### Debug tests

```bash
npm run test:debug
```

## Current Test Coverage in This App

- Unit tests:
  - `src/app.controller.spec.ts`
  - `src/cats/cats.service.spec.ts`
  - `src/cats/cats.resolver.spec.ts`
- E2E test:
  - `test/app.e2e-spec.ts` validates `GET /` returns `Hello World!`.

## Notes

- The current `CreateCatInput` uses TypeScript definite assignment assertions (`!`) for strict mode compatibility.
- If you want runtime validation for GraphQL inputs, use `class-validator` decorators with a global `ValidationPipe` in `src/main.ts`.
