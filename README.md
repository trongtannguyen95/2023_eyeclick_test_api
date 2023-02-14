# 2023 EyeClick Test: Online Shop API
- Code Base: NestJS Typescript
- DB: MongoDB
- Environment: Node 16

## Setting Up
- Run `npm install` in command prompt
- Copy the .env.example into .env and modify the parameter suit you environment
- Run `npm run start` in command prompt to start source code on environment, you can also use `npm run start:dev` to watch the changes
- Imports a MongoDB JS file in folder `/db/2023_eyeclick_test.js` that contains 20 dummies shop item.
- Access into swagger via `localhost:{port}/api/docs/` and try out the API `/auth/sync-default-administrator` it will create 2 test user are: `normaluser|normaluser@2023` and `administrator|administrator@2023` with the administrator you can login and use the API key to test all of the API if you want.
## Folders and Files
### Core Folders
- `/filters`: this contains filter file for NestJS to handle customized request like NotFound
- `/helpers`: contains files with multiple helper function that will be used through out the code
- `/interceptors`: contains interceptor files that will intercept the the request befor or after the method execution to bind extra logic or simple change the properties of the request or response
- `/middlewares`: contains middleware files that will be called before the route handler to change the request or execute others function.
- `/pipes`: contains file that will be called right before the method execution to transform or validate the data that were sent in the request.
- `/modules`: contains modular folders that contains files that belong execution level of the framework. I've devided them into 5 modules "shop, users, frontend, base, s hare" each will perform differents tasks:
### Module Folders
- `/modules/base`: contains basic controller and services that will be extended by others controller and service that will perform some similar task like CRUD.
- `/modules/share`: contains file, service, interfaces, schema and config that will be shared by others module like MongoDB, HTTP, JWT, models.
- `/modules/users`: contains controller and service that specified for users related function like authentication, CRUD users, auth guard.
- `/modules/shop`: contains controller and service that perform CRUD for shop items
- `/modules/frontend`: contains controller and service that will be use by frontend app with or without authentication
