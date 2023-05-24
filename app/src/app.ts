import { Server } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as routers from './routers/AllRouters';
import * as config_redis from './Cache/configCache';
import express, { Request, Response } from 'express';
import * as mongoModels from "./model/Mongo_M/Mongo";

// Start db tools like cursor for access

//? Import Configs
import * as utils from "./utils/utils";
utils

//? Redis 
import * as redis from './Cache/configCache';
redis

//? Mongo 
import * as mongo from './model/Mongo_M/configMongo';
mongo

//! Create Mongo Schema
mongoModels.Users

//? Postgres
import * as postgres from './model/Postgres_M/Postgres';
import * as noteModels from "./model/Postgres_M/Postgres";
postgres

//! Create Postgres Schema
const DB = new noteModels.DB;
//! DB.delete_all_table()  
DB.init_note()
DB.init_follow()
DB.init_readAtLater()
DB.init_notification()


//! Redis print
//?config_redis.redis_client.del("usernames").then((result: any) => console.log("Usernames: ", result));
//?config_redis.redis_client.del("emails").then((result: any) => console.log("Usernames: ", result));

// Listing of redis
config_redis.redis_client.lRange("usernames", 0, -1).then((result: any) => console.log("Usernames: ", result));
config_redis.redis_client.lRange("emails", 0, -1).then((result: any) => console.log("Emails: ", result));


//! Fields of express in below

//? Start express
const app: any = express()

//? App set 
app.set('SECRET_KEY', 'this_secret_key');
app.set('UPLOADS_PDF', './src/uploads/pdf/');
app.set('UPLOADS_PROFILE', './src/uploads/profile/');

//? App use
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/note', routers.NoteRoute);
app.use('/user', routers.UserRoute);
app.use('/admin', routers.AdminRoute);
app.use('/comment', routers.CommentRoute);

//! Run as firstly '/'
app.get('/', (req: Request, res: Response) => res.json(200).json({ok: true, msg: "Welcome my API to social media application "})) 

import Config_server from './config.json'
const server: Server = app.listen(Config_server.Server.port, () => console.log(`is on port: ${Config_server.Server.port}`))