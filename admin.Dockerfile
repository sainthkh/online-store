# Copied from [multi-k8s](https://github.com/StephenGrider/multi-k8s). 
# Will be modified later for production. 

FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html