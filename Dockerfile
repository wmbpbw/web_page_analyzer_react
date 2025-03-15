# frontend/Dockerfile
# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Create a simple error page
RUN echo "<html><body><h1>Server Error</h1><p>Sorry, something went wrong.</p></body></html>" > /usr/share/nginx/html/error.html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]