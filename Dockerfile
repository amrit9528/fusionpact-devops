# ---------------------------
# Stage 1: Build
# ---------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy app code
COPY . .

# Build Next.js app
RUN npm run build


# ---------------------------
# Stage 2: Run (Production)
# ---------------------------
FROM node:18-alpine

WORKDIR /app

# Copy only required files from builder
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
