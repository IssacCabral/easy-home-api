FROM node:20.15.1-alpine

RUN apk add --no-cache bash

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]