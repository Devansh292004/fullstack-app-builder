# A1 App Foundry: The Luxury Startup Beast 🚀

A1 App Foundry is an elite, high-fidelity "app factory" that generates production-ready, luxury-grade (A1) full-stack applications. It transforms a simple English startup pitch into a complete, deployable monorepo—handling everything from architectural design to cloud provisioning.

## ✨ 10 Extraordinary Features
1.  **AI Pitch-to-Code**: Conversational interface that turns visions into validated JSON specifications.
2.  **Luxury UI Engine**: High-fidelity glassmorphic design system using Next.js 14 and Tailwind.
3.  **Security Auditor**: Automated AI audit of generated specs for RBAC and cloud safety.
4.  **One-Click Stripe Wiring**: Pre-configured billing services and subscription hooks.
5.  **GitHub Repo Auto-Export**: Instant push to a new private repository for the user.
6.  **AWS Fargate Orchestrator**: Production-grade IaC (CDK) for scaling from day one.
7.  **Multi-Tenant Logging**: Integrated audit log service for enterprise compliance.
8.  **Prisma Auto-Migrations**: Intelligent database schema management and seeding.
9.  **RBAC Builder**: Automatic generation of roles (Admin, Manager, User) and NestJS Guards.
10. **Zero Lock-in Export**: Download the full monorepo, ready to run on any standard CI/CD.

## 🛠 Tech Stack
- **Monorepo**: Turborepo + pnpm (v10 recommended)
- **Frontend**: Next.js 14+ (App Router, Server Components) + Lucide + Tailwind
- **Backend**: NestJS (Node.js) + OpenAPI/Swagger + Zod Validation
- **Database**: PostgreSQL + Prisma (Shared `@a1/db` package)
- **Infrastructure**: AWS CDK (VPC, ECS Fargate, RDS, S3, CloudFront)
- **Local Dev**: Docker + Docker Compose

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v20+)
- pnpm (v10+)
- Docker & Docker Compose

### 2. Installation
```bash
pnpm install
```

### 3. Environment Setup
The platform uses Docker for the database and services. Ensure Docker is running and execute:
```bash
docker-compose up -d
```

### 4. Running the Foundry
Start the platform in development mode:
```bash
pnpm dev
```
- **Platform Web UI**: [http://localhost:3000](http://localhost:3000)
- **Foundry API**: [http://localhost:4000/api](http://localhost:4000/api) (Swagger UI at `/api`)

### 5. Building for Production
```bash
pnpm build
```

## 📦 Project Structure
- `apps/foundry-web`: The "Luxury" Next.js dashboard and project wizard.
- `apps/foundry-api`: The NestJS orchestrator for AI, Git, and Deployment.
- `packages/generator`: Core emission engine with Handlebars templates.
- `packages/infra`: Shared production-grade AWS CDK constructs.
- `packages/db`: Multi-tenant Prisma schema and shared DB client.

## 🛡 A1 Luxury Standard
Every generated app follows the "A1 Luxury Standard":
- **Clean Architecture**: Separation of concerns across frontend, backend, and infra.
- **Type Safety**: End-to-end TypeScript from DB schema to UI.
- **Scalability**: Deployable to multi-AZ AWS environments via ECS Fargate.
- **Observability**: Built-in tracing hooks and structured logging.

## 🧪 Testing
```bash
pnpm test
```

## 🚢 Deployment (AWS)
To deploy the Foundry itself or the generated apps:
1. Ensure your AWS credentials are configured.
2. Set `GITHUB_TOKEN` in your environment.
3. Run `pnpm --filter @a1/infra deploy`.

A1 App Foundry is designed for developers who value speed without compromising on engineering excellence.
