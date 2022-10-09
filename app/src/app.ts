import express, { Application, Request, Response } from 'express';
import * as routers from './routers/AllRoutes';
import cookieParser from 'cookie-parser';
import * as Users from "./model/Mongo_M";
import bodyParser from 'body-parser';
import { Server } from 'http';


// Start db tools like cursor for access
import * as utils from "./utils/utils";
utils

// Start PosgreSQL DB
import Note from "./model/PostgreSql_M"
Note.init()


const app: any = express()



app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('UPLOADS', './src/uploads/');
app.set('SECRET_KEY', 'this_secret_key');


app.use('/', routers.NoteRoute);
app.use('/register', routers.RegisterRoute);
app.use('/login', routers.LoginRoute);


app.get('/', (req: Request, res: Response) => {
    const take_users: any = Users.find()
        .then((result: Object[]) => res.json("results: " + take_users))
        .catch((error: Error) => res.json(error))

})

import Config_server from './config.json'
const server: Server = app.listen(Config_server.Server.port, () => console.log(`is on port: ${Config_server.Server.port}`))