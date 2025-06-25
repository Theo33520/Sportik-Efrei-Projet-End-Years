FROM node:22-slim

WORKDIR /app

RUN mkdir -p /app/admin

RUN cd /app/admin && npm init -y

COPY package*.json ./admin/
COPY . ./admin

WORKDIR /app/admin

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]