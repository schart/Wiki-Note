"use strict";
import express, { Application, Request, Response, NextFunction } from 'express';
import { config, fileFilter, storage } from './config';
import * as routers from './routers/All_R';
import Mysqldb from './model/Mysql_M';
import * as utils from './utils/utils';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Server } from 'http';
import path from 'path';
import ejs from 'ejs';

const app: Application = express();

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(bodyParser.json());
app.use(cookieParser());

app.set('UPLOADS', './src/uploads/');
app.set('SECRET_KEY', 'this_secret_key');

app.use(express.static('static'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routers.HomeRoute);
app.use('/register', routers.RegisterRoute);
app.use('/login', routers.LoginRoute);
app.use('/note', routers.NoteRoute);
app.use('/notification', routers.NotificationRoute);

/*utils.client.del('usernames')
utils.client.del('emails')*/

utils.db;
Mysqldb.init()


app.get('/', (req: Request, res: Response) => {
    let token = JSON.stringify(req.cookies)
    //let token = jwt.decode(req.cookies.token)

    console.log('[home]: ', JSON.stringify(token))
    const get_notes: any = utils.db.query('select * from notes', (error: Error, result: Object[]) => {
        if (error) { res.status(400).json({ ok: false, error }); }
        else {

            res.render('index', { data: result[0] })

        }
    })
});

const server: Server = app.listen(config.server.port, () => console.log(`is on port ${config.server.port}`))