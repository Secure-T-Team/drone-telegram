FROM node:alpine

WORKDIR /bin/drone-telegram
COPY package*.json ./
RUN npm ci --only=production

COPY src src

ENTRYPOINT [ "node", "/bin/drone-telegram" ]