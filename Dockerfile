FROM node:18.20.0 as build

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN pnpm install

RUN pnpm run build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/nginx.conf /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]