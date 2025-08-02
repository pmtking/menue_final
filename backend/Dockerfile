FROM node:18

WORKDIR /src

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# اختیاری ولی مفید در شرایط خطای permission
RUN chmod +x ./node_modules/.bin/tsc

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
