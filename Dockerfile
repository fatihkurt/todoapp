FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

#### Dev Section
# EXPOSE 3000
# CMD ["npm", "start"]

#### Prod Section
RUN yarn build
FROM nginx:1.19-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/build /usr/share/nginx/html