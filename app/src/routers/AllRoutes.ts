"use strict";
import express, { Request, Response, NextFunction, Router } from 'express';

export const NoteRoute: Router = express.Router();
export const UserRoute: Router = express.Router();
export const AdminRoute: Router = express.Router();
// Controllers
import Login_C from '../controllers/User/Login_C';
import Register_C from '../controllers/User/Register_C';
import Note_C from '../controllers/Note/Note_C';
import User_C from '../controllers/User/User_C';
import Admin_C from '../controllers/Admin/Admin_C'



// Midwares
import * as general_midwares from '../middleware/General_M';
import * as login_midwares from '../middleware/Login_M';
import * as register_midwares from '../middleware/Register_M';
import * as user_midwares from '../middleware/User_M';
import * as note_midwares from '../middleware/Note_M';


// User process

// Register router
UserRoute.post('/register/', user_midwares.NorequireAuth, general_midwares.is_valid_email, register_midwares.presence_user_InRedis_register, Register_C.register, (req: Request, res: Response, next: NextFunction) => { });

// Login routers
UserRoute.post('/login/', user_midwares.NorequireAuth, general_midwares.is_valid_email, login_midwares.presence_user_InRedis_login, login_midwares.password_auth, Login_C.login, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.get('/logout/', login_midwares.check_session_logout, Login_C.logout, (req: Request, res: Response, next: NextFunction) => { });
// Other user process
UserRoute.post('/follow/', user_midwares.requireAuth, User_C.Follow, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.post('/photo-update/', login_midwares.presence_user_InRedis_login, user_midwares.requireAuth, User_C.SetPhoto, (req: Request, res: Response, next: NextFunction) => { });
UserRoute.get('/add-rat/:noteId/', user_midwares.requireAuth, User_C.AddNote_ToRAT, (req: Request, res: Response, next: NextFunction) => { });

//  Note process of User
NoteRoute.post("/upload/", user_midwares.requireAuth, Note_C.note_upload, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.get("/delete/:noteId/", user_midwares.requireAuth, note_midwares.PresenceConfirmedNote, /* That process endpoint for admin */ Note_C.note_delete, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.get("/accept/:noteId/", user_midwares.requireAuth, note_midwares.PresenceUnConfirmedNote, /* That process endpoint for admin */ Note_C.note_accept, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/comment/", user_midwares.requireAuth, note_midwares.PresenceConfirmedNote, Note_C.note_comment, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/like/", user_midwares.requireAuth, note_midwares.PresenceConfirmedNote, Note_C.note_like, (req: Request, res: Response, next: NextFunction) => { })
//NoteRoute.post("/note-update", /* That process endpoint for admin */ Note_C.note_update, (req: Request, res: Response, next: NextFunction) => { })


// Admin process
AdminRoute.post("/notification/", user_midwares.requireAuth, Admin_C.Notification, (req: Request, res: Response, next: NextFunction) => { })
