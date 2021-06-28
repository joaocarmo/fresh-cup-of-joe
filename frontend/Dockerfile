FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# Use npm modules with binaries
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

CMD [ "yarn", "start" ]
