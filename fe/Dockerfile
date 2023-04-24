FROM node:16 AS development
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install
COPY . /app

CMD [ "yarn", "dev" ]