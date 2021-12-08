# coworkers-1337-api
This project is a sample CRUD project for evaluation purposes.

Language : NodeJs

Web Framework : Express

DataBase : MongoDB

ORM : Mongoose
# Packages
- express -> web framework
- body-parser -> for parsing request body to Json
- mongoose -> recommended MongoDB ORM for NodeJS
- cors -> for making apis accessible from other origins
- jsonwebtoken -> for generating and decoding JWT tokens
- lodash -> a lightweight and well-known library which has set of useful helper method (e.g isEmpty, isNan, etc) that makes code much cleaner.
- winston -> for configuring a unified and centralized log format and structure for all the logs throughout the app.

# Why MongoDB and Mongoose
MongoDB is a high performance and purely object based (shameless) NoSQL db which is very easy to use and maintain.
And about Mongoose. In general, 
it's best to use an ORM to have a robust mapping layer between database and application which handles most of the things out of the box, things like connecting, querying, mapping mongo object to normal javascript object etc. And Mongoose is somehow the best available ORM for MongoDB in NodeJS.
# How to run 
1. Clone the repo
2. Go to docker directory -> `cd docker`
3. In terminal -> `docker-compose up` OR `docker-compose up -d`
4. After docker build completed, you can access the web apis at port 3001 -> `http://localhost:3001`
# Public URL 
I've deployed apis to the web. it can be accessed via **http://1337-be-test.tpbot.ir/**

e.g **http://1337-be-test.tpbot.ir/api/coworkers**
# Features
- Get all coworkers (/api/coworkers)
- Pagination (/api/coworkers?start=0&end=20)
- Basic filtering (/api/coworkers?filter=magnus OR /api/coworkers?filter=ma(.*)us)
- Editing of coworkers (/api/coworker)
- JWT authentication (/api/login)
# Useful Hints
- During docker-compose up OR up -d if you got PermissionDenied error and you're running on Linux, simply run the command again with sudo e.g `sudo docker-compose up -d` 
- All the environment variables resided in .env file in docker directory.
- I made authentication enforcement optional and externalized it into an env var (`AUTH_ENABLED`) cause I saw UI is
  is not sending the token in the subsequent calls even though token api call was successful and UI also stored the token value into local storage.
 **So if you want the authentication enforcement happens (throwing 401 if token is missing or is invalid) you just simply need to set the value of `AUTH_ENABLED` to true in the .env file and restart the container.**

# Data Initialization and Persistence
for data initialization into Mongo collection (coworkers collection), I fetched all the coworkers data 
via https://backend-assignment.1337co.de/api/coworkers?end=300&filter=&start=0 once and stored them all into a json file in the root of the project (`sampleData.json`).
When the app starts up I read the data from that file and store them into mongo if not already stored. 
For batch storing I've used `insertMany` method of Mongoose which is recommanded way of doing batch inserts.
So when the app run the data are already imported into database and ready to be used.

Data initialization logic resides in `dataInitializer.js` in the root, you can refer to that file for more details.


# Application Environment variables
As mentioned above all the environments reside in `docker/.env` with proper values (you don't need to set anything) but in case you want to change the values, here are the env vars used in the app :
- SERVER_PORT -> the port that api will be run on (defaulted to 3001)
- MONGO_URI -> MongoDB connection string.
- JWT_SECRET -> private key (secret) for signing JWT tokens
- LOG_LEVEL -> Log level (e.g debug, info, etc) (defaulted to info)
- AUTH_ENABLED -> if set to true, all the requests (except `/api/login`) must have valid JWT token in their header (authorization header) otherwise it would throw 401 (defaulted to false)

*For any further questions/issues contact me at hesam.rasouli1@gmail.com*