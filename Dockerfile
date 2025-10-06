# ---- build stage ----
FROM node:18-alpine AS build
WORKDIR /app

# 依存だけ先に（キャッシュ効率）
COPY package*.json ./
RUN npm ci

# ソース投入＆ビルド
COPY . .
RUN npm run build

# ---- runtime stage ----
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# 本番依存のみインストール
COPY package*.json ./
RUN npm ci --omit=dev

# 実行に必要な成果物をコピー
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.* ./
COPY --from=build /app/node_modules ./node_modules

# Next はデフォで 0.0.0.0 で待受
EXPOSE 3000
CMD ["npm", "start"]
