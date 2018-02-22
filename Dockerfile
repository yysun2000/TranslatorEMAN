FROM node:9
COPY package.json /src/package.json
RUN cd /src; npm install
COPY . /src
EXPOSE 2424
WORKDIR /src

CMD node app.js
