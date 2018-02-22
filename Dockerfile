FROM node:9
COPY package.json /src/package.json
RUN cd /src; npm install; mkdir -p /src/files; mkdir -p /src/public/files;
COPY . /src
EXPOSE 2424
WORKDIR /src

CMD node app.js
