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
docker run -d --name front_end -v frontend:/front --network marhaba_frontend -p 3000:3000 frontend
```
-we create and run a container named front_end and based on the front image, we run it on the marhaba_frontend network and we specifie that we will use the port 3000 as an entrypoint.
## NB:
-d: to activate detach mode\
--name:to name a container\
-v:to create a volume\
-t:to tag an image\

# How to test your application using the unit test
# testing your application using jest et supertest
## Installing the dependencies:
```Bash
npm i jest supertest
```
## define the command that run the test on the packa.json
```python
{
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "handy-storage": "^2.1.6",
    "jest": "^29.3.1",
    "jsonwebtoken": "^8.5.1",
    "local-storage": "^2.0.0",
    "mongoose": "^6.6.5",
    "node-localstorage": "^2.2.1",
    "nodemailer": "^6.8.0",
    "nodemon": "^2.0.20",
    "supertest": "^6.3.1"
  },
  # we just added the bellow section to the file
  "scripts": {
  # due to this part e can use the command npm test to start our test
    "test": "jest"
  }
}
```
## Create a file with the extension .test.js and start coding the testing script in it
## Create a describe function for the login endpoints:
```python
# Require the supertest dependencie and the index file
const req = require('supertest');
const app = require('./index');
describe("login tests", () => {
# test the login endpoint with a valid fields
  test("test for valid data",async ()=>{
  # create a const (object) we will test the endpoint with this object
    const body={
        email:"mohammedwanir67@gmail.com",
        password:"@@@@1234A"
    }
    # send the body to the login endpoint by using supertest
    const tst=await req(app).post("/api/auth/login").send(body)
    # declaring the value that we expect it as a response
    expect(tst.statusCode).toBe(200)
  })
  # test the login endpoint with an anvalid fields
  test("test for invalid password",async ()=>{
    const body={
        email:"mohammedwanir67@gmail.com",
        password:"@@@@1234Ae"
    }
    const tst=await req(app).post("/api/auth/login").send(body)
    expect(tst.statusCode).toBe(400)
  })
  
  test("test for invalid email",async ()=>{
    const body={
        email:"mohammedwanir67@gmail.coma",
        password:"@@@@1234A"
    }
    const tst=await req(app).post("/api/auth/login").send(body)
    expect(tst.statusCode).toBe(400)
  })
  # test the login endpoint with an uncomfirmed account
  test("test for uncomfirmed account",async ()=>{
    const body={
        email:"mohammed@gmail.com",
        password:"@@@@1234A"
    }
    const tst=await req(app).post("/api/auth/login").send(body)
    expect(tst.statusCode).toBe(400)
  })
   
    })
```
## Add the describe function of the register endpoint:
```python
 describe("register tests", () => {
        test("test for existed email",async ()=>{
          const body={
              name:"mohammed",
              email:"mohammedwanir67@gmail.com",
              password:"@@@@1234A"
          }
          const tst=await req(app).post("/api/auth/register").send(body)
          expect(tst.statusCode).toBe(400)
        })
        test("test for valid email",async ()=>{
          const body={
              name:"mohammed",
              email:"mohammedina@gmail.com",
              password:"@@@@1234A"
          }
          const tst=await req(app).post("/api/auth/register").send(body)
          expect(tst.statusCode).toBe(200)
        })

          })
```
## Run the test
```Bash
npm test
```


