# This stage installs modules
FROM node:16.2.0 as modules

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production


# This stage builds TypeScript
FROM node:16.2.0 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY scripts/build.js ./scripts/build.js
COPY tsconfig.json ./
COPY ./src ./src
RUN ./scripts/build.js


# This stage copies modules and built TypeScript
FROM mhart/alpine-node:slim-16.2.0

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=modules ./app ./
COPY --from=build ./app/lib ./lib

EXPOSE 80
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "lib/index.js"]
