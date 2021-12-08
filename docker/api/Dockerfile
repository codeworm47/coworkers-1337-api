FROM node:14-alpine
WORKDIR /app/

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
RUN file="$(ls -1 /app)" && echo $file


COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY /docker/api .

# start app
CMD ["npm", "start"]