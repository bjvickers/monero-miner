FROM ubuntu:17.10

RUN apt-get -y update
RUN apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -yq nodejs build-essential

# @todo
# Reuse curl here
RUN apt-get install -y wget
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install

RUN mkdir -p /app/src
WORKDIR /app

COPY package.json /app/
RUN npm install --silent
RUN npm cache clean --force --silent

COPY ./src /app/src

EXPOSE 80 443 22

CMD [ "npm", "start" ]

