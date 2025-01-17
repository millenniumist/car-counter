FROM node:18

# Install Python and build dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip build-essential

COPY package*.json ./
RUN npm install

COPY . .


EXPOSE 3030

CMD ["node", "app.js"]
