FROM node:alpine

WORKDIR /frontend

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

CMD ["npm", "start"]