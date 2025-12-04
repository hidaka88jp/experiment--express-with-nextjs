FROM node:20-slim

# Install required dependencies for Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 3001

CMD ["node", "src/server.js"]
