FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/.env* ./
COPY --from=builder /usr/src/app/migrations ./migrations

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
