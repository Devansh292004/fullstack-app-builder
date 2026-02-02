# A1 App Foundry: The Luxury Meta-Builder

A1 App Foundry is an elite, production-ready "app factory" that generates luxury-grade (A1) full-stack applications. It handles everything from the initial pitch to cloud deployment on AWS.

## 🚀 One-Command Launch

### Local Development
```bash
# Install dependencies
pnpm install

# Start the entire ecosystem (Web + API + DB)
docker-compose up -d
pnpm dev
```

### Deployment
```bash
# Ship to AWS in one command
pnpm deploy:aws
```

## 🏗 Architecture

- **Monorepo**: Powered by Turborepo and pnpm workspaces.
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion.
- **Backend**: NestJS, TypeScript, REST, OpenAPI.
- **Database**: PostgreSQL with Prisma.
- **Infrastructure**: AWS CDK (ECS Fargate, RDS, Cognito, S3).

## ✨ 10 Extraordinary Features

1.  **Pitch-to-Spec**: Turn vision into technical PRDs with the A1 Brain.
2.  **Security Citadel**: Automated RBAC and audit logging in every build.
3.  **Instant Infrastructure**: Pure AWS CDK generated for your specific app.
4.  **A1 Brain**: Autonomous engineering that understands intent.
5.  **Theme Engine**: Luxury UI themes generated on-demand.
6.  **Smart Migration Engine**: Safe and intelligent database evolution.
7.  **GitHub Pulse**: Live bi-directional sync with your repositories.
8.  **Zero-Lock**: Pure TypeScript code export. No proprietary libraries.
9.  **A1 Sandbox**: Instant preview runner for generated applications.
10. **Observability HUD**: Deep tracing and metrics out of the box.

## 📁 Repository Structure

- `apps/foundry-web`: The main generator UI.
- `apps/foundry-api`: The orchestration engine.
- `packages/generator`: The core code emission engine.
- `packages/db`: Shared Prisma schema and client.
- `packages/infra`: Base AWS CDK definitions.
- `demo/template-app`: Example output of the generator.

## 🧪 Testing

```bash
pnpm test
```

---
© 2026 A1 App Foundry. Built for the elite.
