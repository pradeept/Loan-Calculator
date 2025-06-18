# Stage 1
FROM node:18-alpine AS build

WORKDIR /app 

COPY package.json package.json 

RUN npm i

COPY . .

RUN npm run build

# Stage 2
 
FROM nginx:alpine AS prod 

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]