# Agent Instructions for A1 App Foundry

## Project Structure
- `apps/*`: Applications (Next.js, NestJS).
- `packages/*`: Libraries and tools (Generator, Infra, DB).
- `docs/*`: Architecture and Spec documentation.

## Coding Conventions
- Use TypeScript for everything.
- Follow Clean Architecture in the NestJS backend.
- Use Tailwind CSS for the Next.js frontend.
- Handlebars templates for the generator must stay in `packages/generator/src/templates`.

## Generator Emission
- The `Emitter` class in `packages/generator` is the core of the platform.
- New templates should be added as `.hbs` files.
- The `emitDir` function handles recursive emission of the template directory.

## Testing
- Use `vitest` for unit tests.
- Use Playwright for E2E tests in the generated apps.
