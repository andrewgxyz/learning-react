###### Base stage ######
FROM ubuntu:20.04 AS base
ENV DEBIAN_FRONTEND=noninteractive
SHELL ["/bin/bash", "-c"]

# Enable manuals (man pages)
RUN rm /etc/dpkg/dpkg.cfg.d/excludes && \
    apt update && \
    apt install -y man-db less && \
    mv /usr/bin/man.REAL /usr/bin/man

# Download prerequisites
RUN apt update && apt install -y \
        curl \
        git \
        software-properties-common \
        sudo \
        vim \
        xz-utils

ENV NODE_VER='v13.12.0'
RUN NODE_ARCH=$(if [[ $(uname -p) == 'aarch64' ]]; then echo 'arm64'; else echo 'x64'; fi) && \
    mkdir -p /srv/nodejs/ && cd /srv/nodejs/ && \
    mkdir -p /node/ && \
    curl -L https://nodejs.org/dist/$NODE_VER/node-$NODE_VER-linux-$NODE_ARCH.tar.xz > node-$NODE_VER-linux-$NODE_ARCH.tar.xz && \
    tar -xf node-$NODE_VER-linux-$NODE_ARCH.tar.xz --strip-components 1 && \
    cp -r ./bin/* /usr/bin/ && \
    cp -r ./include/* /usr/include/ && \
    cp -r ./lib/* /usr/lib/ && \
    cp -r ./share/* /usr/share/ && \
    rm -r /srv/nodejs/

# Create app directory
WORKDIR /usr/src/app

# Make sure to switch directories between each app
COPY ./mern_skeleton /usr/src/app
RUN npm i
RUN npm i -g nodemon webpack yarn

EXPOSE 80 4000

CMD ["tail", "-f", "/dev/null"]
