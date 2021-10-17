FROM node:14.11

USER node

WORKDIR /usr/src/app

COPY --chown=node:node ./backend ./

RUN npm ci
RUN npm run build

CMD npm run start
