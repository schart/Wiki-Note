"use strict";
import express, { Request, Response, NextFunction, Application, Router } from 'express';

export const NoteRoute: Router = express.Router();

export const UserRoute: Router = express.Router();


// Controllers
import Login_C from '../controllers/User/Login_C';
import Register_C from '../controllers/User/Register_C';
import Note_C from '../controllers/Note_C';
import User_C from '../controllers/User/User_C';


// Midwares
import * as general_midwares from '../middleware/General_M';
import * as login_midwares from '../middleware/Login_M';
import * as register_midwares from '../middleware/Register_M';
import * as user_midwares from '../middleware/User_M';

// User proccess

// Register router
UserRoute.post('/register/', user_midwares.NorequireAuth, general_midwares.is_valid_email, register_midwares.presence_user_InRedis_register, Register_C.register, (req: Request, res: Response, next: NextFunction) => { });

// Login routers
UserRoute.post('/login/', user_midwares.NorequireAuth, general_midwares.is_valid_email, login_midwares.presence_user_InRedis_login, login_midwares.password_auth, Login_C.login, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.get('/logout/', login_midwares.check_session_logout, Login_C.logout, (req: Request, res: Response, next: NextFunction) => { });

UserRoute.post('/photo-update/', User_C.SetPhoto, (req: Request, res: Response, next: NextFunction) => { });


//  Note proccess of User
NoteRoute.post("/upload/",  Note_C.note_upload, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/delete/", /* That proccess endpoint for admin */ Note_C.note_delete, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/accept/", /* That proccess endpoint for admin */ Note_C.note_accept, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/comment/",  Note_C.note_comment, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/like/",    Note_C.note_like, (req: Request, res: Response, next: NextFunction) => { })
//NoteRoute.post("/note-update", /* That proccess endpoint for admin */ Note_C.note_update, (req: Request, res: Response, next: NextFunction) => { })
