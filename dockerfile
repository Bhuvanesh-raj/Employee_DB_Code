FROM node:latest

ENV DB_HOST=localhost\ 
DB_PASSWORD=Tomcruze@123\
DB_USER=root\
DB_NAME=Form

RUN mkdir /home/app

COPY . /home/app
EXPOSE 3000
CMD ["node","/home/app/server.js"]