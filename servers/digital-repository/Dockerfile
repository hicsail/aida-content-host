FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

ARG MONGO_URI
ENV MONGO_URI=${MONGO_URI}

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]