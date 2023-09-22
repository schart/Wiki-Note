import { Server } from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as user_route from './routers/route.user';
import * as note_route from './routers/route.note';
import * as admin_route from './routers/route.admin';
import express, { Request, Response } from 'express';
import * as comment_route from './routers/route.comment';
import * as mongoModels from "./model/model.mongo/models";
import * as config_redis from './utils/util.cache.config';


// Start db tools like cursor for access
    //? Import Configs
    import * as utils from "./utils/util.generate.string";
    utils

    //? Redis 
    import * as redis from './utils/util.cache.config';
    redis

    //? Mongo 
    import * as mongo from './utils/util.mongo.config';
    mongo

    //! Create Mongo Schema/Models
    mongoModels.Users

    //? Postgres
    import * as postgres from './model/model.postgre/Postgres';
    import * as noteModels from "./model/model.postgre/Postgres";
    postgres

    //! Create Postgres Schema
    const DB = new noteModels.DB;
    //! DB.delete_all_table()  
    DB.init_note()
    DB.init_follow()
    DB.init_notification()
    DB.init_readAtLater()


    //! Redis print
    //?config_redis.redis_client.del("usernames").then((result: any) => console.log("Usernames: ", result));
    //?config_redis.redis_client.del("emails").then((result: any) => console.log("Usernames: ", result));
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

app.use('/note', note_route.NoteRoute);
app.use('/user', user_route.UserRoute);
app.use('/admin', admin_route.AdminRoute);
app.use('/comment', comment_route.CommentRoute);

//! Run as firstly '/'
app.get('/', (req: Request, res: Response) => res.json(200).json({ok: true, msg: "Welcome my API to social media platform "})) 


import Config_server from './config.json'
const server: Server = app.listen(Config_server.Server.port, () => console.log(`is on port: ${Config_server.Server.port}`))