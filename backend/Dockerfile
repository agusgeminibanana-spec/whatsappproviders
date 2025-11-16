FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only backend files to install dependencies
COPY backend/package.json backend/package-lock.json* ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

COPY backend/ ./
RUN pnpm --filter backend run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/dist ./dist

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/index.js"]
