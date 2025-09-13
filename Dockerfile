FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache wget

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN mkdir -p /app/img

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "app.js"]
