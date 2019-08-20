FROM node:alpine
WORKDIR /usr/src

RUN npm install -g lerna
COPY ./lerna.json ./
COPY ./package.json ./
COPY ./packages/admin/package.json ./packages/app/package.json
COPY ./packages/theme/package.json ./packages/theme/package.json
RUN lerna bootstrap

COPY ./packages/theme ./packages/theme
COPY ./packages/admin ./packages/app

WORKDIR /usr/src/packages/theme
RUN npm run build

WORKDIR /usr/src/packages/app
CMD ["npm", "run", "start"]