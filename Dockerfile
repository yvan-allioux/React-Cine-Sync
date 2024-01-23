FROM node:18.10.0-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

#docker build -t react-cine-sync . && docker run -it -p 3000:3000 react-cine-sync


