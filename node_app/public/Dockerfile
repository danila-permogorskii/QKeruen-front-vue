# Use the official Node.js image as the base image
FROM node:18.16-alpine3.18 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Vue.js application
RUN npm run build

# Use a lightweight web server to serve the built application
FROM nginx:alpine as production-stage

# Copy the built application from the previous stage to the NGINX web server
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose a port (default port for NGINX is 80)
EXPOSE 80

# Start the NGINX web server
CMD ["nginx", "-g", "daemon off;"]
