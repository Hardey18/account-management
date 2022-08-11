FROM node:12-stretch

WORKDIR  /home/node/app

COPY . .

RUN yarn

RUN npx tsc

EXPOSE 3000

CMD yarn dev