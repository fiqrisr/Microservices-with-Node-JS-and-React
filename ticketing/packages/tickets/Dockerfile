FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN yarn install --prod
COPY . .

CMD ["yarn", "dev"]
