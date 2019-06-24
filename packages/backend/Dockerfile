FROM  node:10.16.0-alpine

WORKDIR /usr/src/app
COPY ./ /usr/src/app
# COPY ../proto /usr/src/proto

RUN which npm
RUN npm i -g yarn

CMD sh ./launch.sh

EXPOSE 50051
