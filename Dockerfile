FROM node:9
WORKDIR /app
COPY package.json ./app
RUN npm install
COPY . /app


RUN apt-get update
RUN apt-get install -y default-jdk

CMD ["npm" , "start"]