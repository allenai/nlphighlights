FROM node:10.15.2

COPY package.json .
COPY package-lock.json .

RUN npm install -g npm
RUN npm install -g gatsby-cli
RUN npm install

COPY src/ src/
COPY gatsby-browser.js .
COPY gatsby-config.js .
COPY gatsby-node.js .
COPY meta.json .

COPY static/ static/
COPY chapters/ chapters/

RUN npm run build

EXPOSE 8000
CMD ["gatsby", "serve", "--port", "8000", "--host", "0.0.0.0"]
