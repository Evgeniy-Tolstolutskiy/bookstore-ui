FROM node:10-alpine as node
COPY . /dist
WORKDIR /dist

ARG ENDPOINT

RUN npm install && \
    npm run build && \
    npm run start
