# A1 App Foundry Architecture

## 1. Overview
A1 App Foundry is a "Startup Beast" meta-builder designed to generate production-ready, luxury-grade (A1) full-stack applications. It transforms a startup pitch into a complete monorepo including Frontend, Backend, Database, and AWS Infrastructure.

## 2. A1 Luxury Standard
The A1 Standard ensures every generated app follows industry roadmaps:
- **Frontend**: Next.js App Router, React Server Components, Tailwind, Zod validation.
- **Backend**: NestJS, Dependency Injection, Guards (Auth/RBAC), Pipes (Validation).
- **DevOps**: Docker, GitHub Actions (Lint, Test, Build, Deploy).
- **AWS/Infra**: VPC (Public/Private), ALB, ECS Fargate, RDS, IAM Roles, Secrets Manager.

## 3. Core Components
- `apps/foundry-web`: Next.js UI with a high-fidelity 'Luxury' Project Wizard.
- `apps/foundry-api`: NestJS API orchestrating spec generation and project management.
- `packages/generator`: Core logic for code emission using Handlebars templates.
- `packages/infra`: AWS CDK constructs for platform and generated apps.
- `packages/db`: Multi-tenant Prisma schema for the Foundry.

## 4. AI & "Startup Beast" Features
- **Pitch-to-Schema**: LLM-driven architecture generation.
- **Security Auditor**: Automated security review of the generated spec.
- **Stripe Wiring**: One-click subscription billing setup.
- **RBAC Builder**: Automatic role-based access control generation.
- **Audit Logs**: Built-in observability and tracking.

## 5. Deployment Flow
1. User enters pitch.
2. Foundry API uses LLM to generate JSON Spec.
3. User reviews and approves Spec.
4. Generator emits full monorepo from templates.
5. Code is pushed to GitHub and deployed to AWS via CDK.
