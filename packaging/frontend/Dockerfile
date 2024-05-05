FROM node:latest

WORKDIR /app
COPY riotshop/ /app/

RUN npm ci

ENV CI=true
ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]