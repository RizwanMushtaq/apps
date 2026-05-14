FROM node:24-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run prisma:migrate:deploy && npm run seed && npm run start:dev"]