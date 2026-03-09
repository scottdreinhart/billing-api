FROM node:24-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.31.0 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base AS build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY tsconfig.json tsconfig.build.json ./
COPY src/ src/
RUN pnpm build

FROM node:24-alpine AS production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
USER node

CMD ["node", "dist/server.js"]
