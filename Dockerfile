# Lightweight Node.js for production
FROM node:20-alpine

# Create app working directory
WORKDIR /app

# Copy package.json and package-lock.json
# Copying only dependencies first speeds up the build
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy all application code
COPY . .

# Generate Prisma Client (required for Prisma)
RUN npx prisma generate

# Port for Express to listen on
EXPOSE 3001

# Command to start Express
CMD ["node", "src/server.js"]