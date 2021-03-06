FROM node:10.15.2

COPY package.json .
COPY package-lock.json .

RUN npm install -g npm
RUN npm install -g gatsby-cli
RUN npm install

COPY src/ src/
COPY gatsby-config.js .
COPY gatsby-node.js .
COPY meta.json .

COPY static/ static/
COPY episodes/ episodes/

RUN npm run build

EXPOSE 8000
CMD ["npm", "run", "start" ]
