FROM node:18

WORKDIR /src

COPY package*.json ./
# RUN npm install

COPY . .

EXPOSE 8080

# CMD ["node", "index.js"]
# یا اگر از nodemon استفاده می‌کنی:
CMD ["npm","start"]
