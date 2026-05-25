FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 AS lambda-adapter

FROM node:22-alpine AS runtime
COPY --from=lambda-adapter /lambda-adapter /opt/extensions/lambda-adapter
RUN addgroup -S portfolio && adduser -S portfolio -G portfolio
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
ENV PORT=3000
ENV READINESS_CHECK_PATH=/api/health
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
USER portfolio
EXPOSE 3000
CMD ["node", "server.js"]
