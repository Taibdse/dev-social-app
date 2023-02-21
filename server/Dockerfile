FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm i --silent

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node


# Base image
FROM node:16 As production

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Create a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
RUN npm run start:prod
