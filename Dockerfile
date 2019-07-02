# Stage 1: Build
FROM node:12-alpine as build

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN apk add build-base autoconf automake zlib-dev
RUN yarn install

COPY . /app
RUN INLINE_RUNTIME_CHUNK=false yarn build


# Stage 2: Production
FROM nginx:1.17-alpine

EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html
