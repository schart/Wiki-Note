"use strict";
import express, { Request, Response, NextFunction, Router } from 'express';

export const NoteRoute: Router = express.Router();
export const UserRoute: Router = express.Router();
export const AdminRoute: Router = express.Router();
// Controllers
import Login_C from '../controllers/User_C/Login';
import Register_C from '../controllers/User_C/Register';
import Note_C from '../controllers/Note_C/Note';
import User_C from '../controllers/User_C/User';
import Admin_C from '../controllers/Admin_C/Admin'



// Midwares
import * as general_midwares from '../Middlewares/General';
import * as login_midwares from '../Middlewares/Login-Register_M/Login';
import * as register_midwares from '../Middlewares/Login-Register_M/Register';
import * as user_midwares from '../Middlewares/User_M/User';



// User process

// Register router
UserRoute.post('/register/', user_midwares.NorequireAuth, general_midwares.is_valid_email, register_midwares.presence_user_InRedis_register, Register_C.register, (req: Request, res: Response, next: NextFunction) => { });

// Login routers
UserRoute.post('/login/', user_midwares.NorequireAuth, general_midwares.is_valid_email, login_midwares.presence_user_InRedis_login, login_midwares.password_auth, Login_C.login, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.get('/logout/', login_midwares.check_session_logout, Login_C.logout, (req: Request, res: Response, next: NextFunction) => { });

// Other user process
UserRoute.post('/follow/', user_midwares.requireAuth, User_C.Follow, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.post('/photo-update/', user_midwares.requireAuth, login_midwares.presence_user_InRedis_login,   User_C.SetPhoto, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.get('/add-rat/:noteId/', user_midwares.requireAuth, User_C.AddNote_ToRAT, (req: Request, res: Response, next: NextFunction) => { });
//  Note process of User
NoteRoute.post("/upload/", user_midwares.requireAuth, Note_C.note_upload, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.get("/delete/:noteId/", user_midwares.requireAuth,   /* That process endpoint for admin */ Note_C.note_delete, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.get("/accept/:noteId/", user_midwares.requireAuth,  Note_C.note_accept, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/comment/", user_midwares.requireAuth,  Note_C.note_comment, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/like/", user_midwares.requireAuth,  Note_C.note_like, (req: Request, res: Response, next: NextFunction) => { })
//NoteRoute.post("/note-update", /* That process endpoint for admin */ Note_C.note_update, (req: Request, res: Response, next: NextFunction) => { })


// Admin process
AdminRoute.post("/notification/", user_midwares.requireAuth, Admin_C.Notification, (req: Request, res: Response, next: NextFunction) => { })