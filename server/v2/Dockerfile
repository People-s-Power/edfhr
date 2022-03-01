FROM node:14-alpine
LABEL maintainer="Peter Akaliro"

# Install Java

# RUN apk add --no-cache openjdk8

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN yarn
# Bundle app source
COPY . .

EXPOSE 8002
CMD [ "yarn", "start" ]
