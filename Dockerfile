FROM node:dubnium
MAINTAINER Matthew LaForest

RUN mkdir -p /app
WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

COPY package.json yarn.lock ./
RUN NODE_ENV=$NODE_ENV yarn install

CMD ["yarn", "dev"]
