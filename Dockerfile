FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y wget maven ruby openjdk-8-jre npm
RUN gem install asciidoctor asciidoctor-diagram
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
RUN npm install -g codecov
RUN npm run build
RUN npm run docs
RUn npm run start