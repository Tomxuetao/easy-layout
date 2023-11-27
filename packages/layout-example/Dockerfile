FROM nginx:alpine

RUN mkdir /data

COPY dist/ /data/layout

CMD ["nginx", "-g", "daemon off;"]
