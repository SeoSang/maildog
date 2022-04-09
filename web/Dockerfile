FROM node:alpine

ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY ./ ./

ENV NODE_ENV production
ENV DEPLOY_ENV production

RUN pnpm build

CMD ["pnpm", "start"]
