FROM node:22-slim

WORKDIR /app/api

COPY ./package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]