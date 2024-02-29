FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
EXPOSE 5173
EXPOSE 8000
CMD [ "npm", "start"]
