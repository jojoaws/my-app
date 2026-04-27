FROM node:18

WORKDIR /app

COPY worker/package*.json ./

RUN npm install

COPY . .

CMD ["node", "app.js"]
