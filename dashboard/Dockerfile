FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

# RUN yarn global add pm2

COPY ./package*.json ./

COPY ./tsconfig.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY . .

# Build app
RUN yarn build

# add serve

# RUN yarn global add serve

# Expose the listening port
EXPOSE 3001

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
# USER node

# Run npm start script when container starts
# CMD [ "serve","-s" "-l" "3001"]
# CMD [ "serve", "3001"]
# CMD [ "pm2", "start" ,"yarn",  "--name", "api", "--" ,"start" ]