# Gym Master Application 🔥

Là một gym management web application cho môn Phát triển phần mềm theo kỹ năng ITSS của nhóm 6

## System requirements 🚀

- Java JDK version 17
- Maven
- PostgreSQL >= 14
- NodeJS >= v18.16.1

## Setup and Configuration ✨

We strongly recommend using IntelliJ IDEA.

Find /gym_master/server/src/main/resources/application.properties

You can keep the application.properties file as it is, the application will connect to ElephantSQL-hosted PostgreSQL database.
You don't have to configure database on your local PC

If you want to configure database on your local PC:

First, we need to configure for application to store data on PostgreSQL,
create a new database namely 'gym_master' on PostgreSQL

Change sections below to adapt to newly created database.

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`

Then you can run server backend by click run in IntelliJ IDEA. But If you do not have IntelliJ, you can do the following step to run this project.

Change directory to /gym_master/server directory.

```
cd server/
```

Run this command.

```
mvn exec:java -Dexec.mainClass=com.itss.gym_master.GymMasterApplication
```

And then maven will install all the package and run server for you.

For database seeding, run application at GymMasterApplication.java
and browse on your browser `http://localhost:8080/api/v1/db/seed`

Then, redirect to /gym_master/client, to download all resources for frontend, run command on terminal

```
yarn
```

To run client application, at client directory, run on terminal

```
yarn dev
```

Done! enjoy the application by browsing http://project.localhost:3000

## Usage 🚀

Client: `http://project.localhost:3000/`

Server: `http://localhost:8080/api/v1`
