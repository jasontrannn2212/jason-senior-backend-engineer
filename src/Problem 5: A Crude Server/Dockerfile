FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN apk update && apk add openssl

RUN npm run prisma:generate

RUN npm run build

CMD ["node", "dist/index.js"]
