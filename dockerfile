FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /app

COPY package.json package.json
RUN npm install
RUN npm install -g nodemon

ENV NODE_ENV=docker

COPY . .

EXPOSE  8000

# start app
CMD ["nodemon", "src/app.js"]