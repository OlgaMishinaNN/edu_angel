# Angel 0.1
Introducing a self-educational project aimed at exploring the basic capabilities of the NestJS framework and TypeScript with Docker to containerize our NestJS application and PostgreSQL database using the official postgres image from Docker Hub.

## Prerequisites
1. Make sure that [Node.js](https://nodejs.org/en) (version >= 16) is installed on your operating system.
2. Docker Desktop installed on your computer (run the `docker -v` command to verify the installation); if not, install it from [here](https://www.docker.com/products/docker-desktop/)

## Setup
1. Clone repository<br/>
`git clone https://github.com/OlgaMishinaNN/edu_angel`<br/>
`cd edu_angel`

2. Run the command
`docker compose up`

3. Now we can access the NestJS application by visiting http://localhost:3000 in our web browser and pgAdmin by visiting http://localhost:5050 in our web browser.

4. Swagger API description is available at http://localhost:3000/api
