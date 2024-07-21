# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


# Expose port 3000
EXPOSE 3000

# Command to run the production server
CMD ["sh", "-c", "npm run build && npx serve -s build"]
