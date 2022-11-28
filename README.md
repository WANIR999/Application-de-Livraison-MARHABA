# Application-de-Livraison-MARHABA
# How to dockerize your application

Docker is a software platform that allows you to build, test, and deploy applications quickly.

# Installation

Use the Docker documentation [Docker docs](https://docs.docker.com/desktop/install/windows-install/) to install and start using Docker.

# Usage


## Pulling the Node image from the [Dockerhub](https://hub.docker.com/_/node)
```bash
docker pull node
```
we can also pull an optimised version by the command
```bash
docker pull node:[version]alpine
```
## Create a Dockerfile into the backend directory.

```python
# Base image

FROM node

# Define the working directory

WORKDIR /App

# copy the dependencies from the package.json and pass it to the working directory

COPY package.json .

# installing the dependencies into the working directory

RUN npm install

# copy and past the code source into the working directory

COPY . .

# 

CMD ["node","index"]
```

## Create a Dockerfile into the frontend directory.

```python
FROM node

WORKDIR /front

COPY package.json .

RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm","start"]
```
## Creating a network named marhaba_backend 
```bash
docker network  create marhaba_backend
```
## Runing a db_container 
```bash
docker run -d --name marhaba-db -v marhaba-db:/data/db --network marhaba_backend mongo
```
-creating and runing a container based on a mongodb image and a volume who link this container and the /data/db from mongo into the marhaba_backend network.

## build the backend image 
```bash
docker build . -t backend
```
-Into the backend directory we run the command wich will execute the backend dockerfile and build a backend image.
## run the backend container 
```bash
docker run -d --name back_end -v backend:/app  --network marhaba_backend -p 8080:8080 backend
```
-we create and run a container named back_end and based on the backend image, we run it on the marhaba_backend network and we specifie that we will use the port 8080 as an entrypoint.

## Creating a network named marhaba_frontend
```bash
docker network  create marhaba_frontend
```
## build the frontend image 
```bash
docker build . -t frontend
```
-Into the frontend directory we run the command wich will execute the frontend dockerfile and build a frontend image.

## run the frontend container 
```bash
docker run -d --name front_end -v frontend:/app --network marhaba_frontend -p 3000:3000 frontend
```
-we create and run a container named front_end and based on the front image, we run it on the marhaba_frontend network and we specifie that we will use the port 3000 as an entrypoint.
## NB:
-d: to activate detach mode\
--name:to name a container\
-v:to create a volume\
-t:to tag an image\
