## CRM Skautoteka - Backend (Express.js/Sequelize/MySQL)

-   [Introduction](#introduction)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Starting the Development Server](#starting-the-development-server)
-   [Building the Project for Production](#building-the-project-for-production)
-   [Utils Scripts](#utils-scripts)

## Introduction

**Skautoteka** repository is an application written in Express.js that is run on the backend and it's main purpose is to serve as a CRM controller that is run on the server. The project is a simple application that uses Sequelize models to allow ORM typings. This simplifies the process of managing database relations and creating/updating/removing database entries without having to write complex SQL queries. The users of the system can save, update, or remove records from the database. The system allows for authentication through JSON web token and can the users can protect their resources via a simple authorisation system.

### Project Structure

The project is split into many different folders to maintain clear structure.

-   **Controller**

    -   Contains all controllers - files that "control" the way a given request is handled. For example, `task-controller.ts` has all the functions connected with adding/removing the tasks. It also has a function that allows for retrieval of all records and retrieval of create fields.

-   **Db**

    -   Contains all database models that are used to initialize the database. It also has a file called `sequelize.ts` that is responsible for sequelize configuration. For reference, please see https://www.npmjs.com/package/sequelize-typescript and https://sequelize.org/docs/v6/other-topics/typescript/ for detailed documentation.

-   **Error**

    -   Contains custom errors files. This allows for a clear and structured way of informing the user of this service when an error occurs. The `base-error.ts` file serves as the base class of the error that other classes should extend.

-   **Interface**

    -   This is where all the typescript interfaces/types/enums etc. are situated. Each file should be prefixed with the letter i i.e. `iauth.ts` to make it easier for developers to search and recognize interface files and set them apart from other files when browsing.

-   **Middleware**

    -   Middleware folder consists of any custom express middleware that will be used thoughout the application. Middleware are functions that run sequentially and allow you to execute logic on the server before or after the http request has been processed. This allows, for example, for easy authentication. For further reference, please see https://expressjs.com/en/guide/using-middleware.html

-   **Permissions**

    -   Consists of files that are static files that serve as a layout for permissions depending on a module. Each file represents a domain of the application. Inside those files there are many objects defined each representing different resource action (`MODULE`/`CREATE`/`REMOVE`/`READ`/`EDIT`). Each object defines an array of roles that can perform the resource action.

-   **Routes**

    -   Each file inside this folder represents the domain of the application. Inside each file there are express route definition for incoming HTTP requests.

-   **Seeders**
    -   This is a catalogue that is used to populate the database for development purposes. This is especially useful when running a testing e2e instance in order to clear the database state. This allows for the testing process to become more stable. Instructions on how to run the migrations will follow.

## Prerequisites

Ensure you have the following installed on your system before proceeding:

-   [Node.js](https://nodejs.org/) (version 18.0 or later)
-   [Package Manager (e.g., npm)](https://www.npmjs.com/get-npm)
-   [MySQL](https://www.mysql.com/)

When you have instaled MySQL locally, make sure to create a database and a user with a password. This will be needed in the next steps.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/Skautoteka/crm-backend.git
    ```
2. Navigate to project directory

```
cd crm-backend
```

3. Create .env file

Please make sure that you create a .env file inside of the root of the project. This file will not be public and pushed to the repository, so you don't need to worry about you access/refresh token secrets. Create entries inside that file as follows

```
# GENERAL
PORT=3000 # LOCAL PORT OF THE APPLICATION (DEVELOPMENT PURPOSES)

# DB
DB=skautoteka # NAME OF YOUR DATABASE
DB_DIALECT=mysql
DB_USER=root # THE USER YOU CREATED INSIDE MYSQL DATABASE LOCALLY
DB_PW=password # THE PASSWORD FOR THE USER INSIDE MYSQL DATABASE

# SECURITY
ACCESS_TOKEN_SECRET=token # ACCESS TOKEN SECRET (AUTHENTICATION REASONS)
REFRESH_TOKEN_SECRET=secret # REFRESH TOKEN SECRET (AUTHENTICATION REASONS)
```

3. Install all project dependencies

```
npm install
```

## Starting the Development Server

To start the development server you need to run the following command inside your command line terminal. Please make sure you are inside the root of the project.

```
npm run dev
```

When the compiling is done the application should be served locally on the port you have provided inside .env file.

## Utils Scripts

#### Seeding

There are also some helper scripts to make the work with the project a little bit easier. For example, you can execute a script that will migrate all the seeds that have been discussed in project structure section. In order to run database migration run the following command

```
npm run migrate
```

If you want to migrate each time a change inside a project was made during development, you can run

```
npm run dev:migrate
```

#### Lint

There is also linting configured that helps you check and potentially fix files for linting rules. To run lint please run the following command

```
npm run lint:fix
```
