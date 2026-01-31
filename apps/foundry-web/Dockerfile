FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter @a1/foundry-web build

FROM base
COPY --from=build /app /app
WORKDIR /app/apps/foundry-web
EXPOSE 3000
CMD [ "pnpm", "start" ]
