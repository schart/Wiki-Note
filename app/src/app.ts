import express, {  Request, Response } from 'express';
import * as routers from './routers/AllRoutes';
import cookieParser from 'cookie-parser';
import * as Models from "./model/Mongo_M";
import bodyParser from 'body-parser';
import { Server } from 'http';



// Start db tools like cursor for access
import * as utils from "./utils/utils";
utils

// Start PosgreSQL DB
import * as Note_Models from "./model/PostgreSql_M"

// not delete Notes keep in this 
const DB = new Note_Models.DB;
// DB.delete_all_table() -> for delete all table in db
DB.init_note()
DB.init_follow()
DB.init_notification()
DB.init_readAtLater()

//DNote -> Deleted notes keep in this 
//const DNote: any = new Note_Models.Deleted_Notes
//DNote.init()


const app: any = express()

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('SECRET_KEY', 'this_secret_key');
app.set('UPLOADS_PDF', './src/uploads/pdf/');
app.set('UPLOADS_PROFILE', './src/uploads/profile/');


app.use('/note', routers.NoteRoute);
app.use('/user', routers.UserRoute);
app.use('/admin', routers.AdminRoute)

// For parsing data in cache
utils.redis_client.lRange("usernames", 0, -1).then((result: any) => console.log(result))
utils.redis_client.lRange("emails", 0, -1).then((result: any) => console.log(result))
utils.redis_client.SMEMBERS("confirmedNotes").then((result: any) => console.log("confirmedNotes: ", result))
utils.redis_client.SMEMBERS("unconfirmedNotes").then((result: any) => console.log("unconfirmedNotes: ", result))


//! for delete all data in keys
/*
utils.redis_client.del("usernames").then((res: any) => console.log(res))
utils.redis_client.del("emails").then((res: any) => console.log(res))
*/

app.get('/', (req: Request, res: Response) => 
{
    const Get_Users: any = Models.Users.find()
        .then((result: any) => res.json("results: " + Get_Users))
        .catch((error: Error) => res.json(error))
        

})

import Config_server from './config.json'
const server: Server = app.listen(Config_server.Server.port, () => console.log(`is on port: ${Config_server.Server.port}`))