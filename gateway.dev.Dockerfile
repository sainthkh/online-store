FROM node:alpine
WORKDIR /usr/src

RUN npm install -g lerna
COPY ./lerna.json ./
COPY ./package.json ./
COPY ./packages/gateway/package.json ./packages/app/package.json
RUN lerna bootstrap

COPY ./packages/gateway ./packages/app

WORKDIR /usr/src/packages/app
CMD ["npm", "run", "start:dev"]