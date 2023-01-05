# Install Dependency
FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app
COPY ./package.json ./
RUN npm install --save --production

# Run
COPY ./ .
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000

cmd ["npm", "run", "start"]
