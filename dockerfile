FROM node:15.8-alpine3.10

WORKDIR /opt/app

COPY package*.json ./
COPY ./src ./src/

RUN npm ci

CMD [ "node", "./src/index.js" ]

