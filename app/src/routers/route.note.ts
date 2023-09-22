"use strict"; import express, { Request, Response, NextFunction, Router } from 'express';

// Routers
export const NoteRoute: Router = express.Router();
export const UserRoute: Router = express.Router();
export const AdminRoute: Router = express.Router();
export const CommentRoute: Router = express.Router();

import * as check_email_util from '../utils/util.check.email';

// Controllers
import Note_C from '../controllers/controller.note/note';

// Midwares
import * as user_midwares from '../Middlewares/token/middleware.token';

//? Note process of User
NoteRoute.post("/upload/", user_midwares.requireAuth, Note_C.note_upload, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.post("/like/", user_midwares.requireAuth,  Note_C.note_like, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.get("/accept/:noteId/", /* admin */ user_midwares.requireAuth, user_midwares.isAdminTrue, Note_C.note_accept, (req: Request, res: Response, next: NextFunction) => { })
NoteRoute.get("/delete/:noteId/", /* admin */ user_midwares.requireAuth, user_midwares.isAdminTrue, Note_C.note_delete, (req: Request, res: Response, next: NextFunction) => { })
