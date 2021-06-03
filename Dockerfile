FROM node:16-alpine AS builder

WORKDIR /opt/fcoj

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

# Use npm modules with binaries
ENV PATH /opt/fcoj/node_modules/.bin:$PATH

COPY . .

RUN yarn build

COPY ./dist ./api/static

FROM builder AS worker

# Set the server port
ENV SERVER_PORT 3001

CMD [ "yarn", "api:start" ]
