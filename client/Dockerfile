FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG API_URL
RUN echo "VITE_API_URL=$API_URL" > .env

RUN npm run build

CMD ["npm", "run", "preview"]