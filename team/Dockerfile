FROM node:14-alpine
LABEL maintainer="Peter Akaliro"
LABEL description="Nextjs Frontend"


# Create app directory
WORKDIR /app

COPY package*.json ./

RUN yarn
# Bundle app source

RUN yarn build

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]
