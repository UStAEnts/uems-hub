FROM node:current-alpine
# Configure this image to have python, required for building frontend
RUN apk add --update python
RUN apk add --no-cache make gcc g++ python

EXPOSE 15450
CMD ["npm", "run", "start"]
ENV NODE_ENV=dev

# Copy in the frontend, move into it and build it
ADD uems-frontend-themis /usr/app/gateway/frontend-themis/
WORKDIR /usr/app/gateway/frontend-themis/
RUN npm install
RUN npm run build

RUN apk del make gcc g++ python

# Then move into the gateway folder, copy in dependencies and install 
WORKDIR /usr/app/gateway
COPY uems-gateway/package*.json ./
RUN npm install

COPY uems-gateway/. .
RUN ls -lah
RUN npm run build
