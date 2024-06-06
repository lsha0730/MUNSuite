FROM node:22-alpine

USER node

WORKDIR /app

COPY package*.json .

RUN yarn install

COPY . .

RUN npm run build

CMD ["node", "build/index.js"]

EXPOSE 3000