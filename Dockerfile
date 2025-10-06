# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Nextのネイティブバイナリで必要になることがある
RUN apk add --no-cache libc6-compat

# 依存は先に入れてキャッシュ効かせる
COPY package*.json ./
RUN npm ci

# ソース投入（.dockerignore で不要物は除外）
COPY . .

# あなたの package.json は "build": "npm run build:tsc && next build"
# → TypeScript(Functions用) のビルド → Next の本番ビルド(.next生成)
RUN npm run build

# ---- runtime stage ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache libc6-compat

# 本番依存のみ（軽量化）
COPY package*.json ./
RUN npm ci --omit=dev

# ビルド成果物だけコピー（public/next.config.* が無くてもOK）
COPY --from=build /app/.next ./.next

# 必要になった時だけ↓を追加（今は無いので入れない）
# COPY --from=build /app/public ./public
# COPY --from=build /app/next.config.* ./

# 既定は3000で待受。App Serviceでは WEBSITES_PORT=3000 を設定する
EXPOSE 3000
CMD ["npm", "start"]
