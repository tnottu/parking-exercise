###
# Build backend
###
FROM node:14.11 as backend-build
WORKDIR /usr/src/app
COPY ./backend ./backend
RUN npm ci --prefix ./backend
RUN npm run build --prefix ./backend

###
# Build frontend
###
FROM node:14.11 as frontend-build
WORKDIR /usr/src/app
COPY ./frontend ./frontend
RUN npm ci --prefix ./frontend
RUN npm run build --prefix ./frontend

###
# Deploy builds
###
FROM node:14.11 as deploy
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=backend-build /usr/src/app/backend ./
COPY --chown=node:node --from=frontend-build /usr/src/app/frontend/build ./static

###
# Start app
###
CMD npm run start
