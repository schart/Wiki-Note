"use strict"; import express, { Request, Response, NextFunction, Router } from 'express';

// Routers
export const UserRoute: Router = express.Router();

import * as check_email_util from '../utils/util.check.email';

// Controllers
import Login_C from '../controllers/controller.user/login';
import Register_C from '../controllers/controller.user/register';
import User_C from '../controllers/controller.user/user';
 


// Midwares
import * as login_midwares from '../Middlewares/login/middleware.login';
import * as register_midwares from '../Middlewares/register/middleware.register';
import * as user_midwares from '../Middlewares/token/middleware.token';


//? User process

    //! Register router
    UserRoute.post('/register/', user_midwares.NorequireAuth, check_email_util.is_valid_email, register_midwares.presence_user_InRedis_register, Register_C.register, (req: Request, res: Response, next: NextFunction) => { });

    //! Login routers
    UserRoute.post('/login/', user_midwares.NorequireAuth, check_email_util.is_valid_email, login_midwares.presence_user_InRedis_login, login_midwares.password_auth, Login_C.login, (req: Request, res: Response, next: NextFunction) => { });
    UserRoute.get('/logout/', login_midwares.check_session_logout, Login_C.logout, (req: Request, res: Response, next: NextFunction) => { });

    //! Other user process
    UserRoute.post('/follow/', user_midwares.requireAuth, User_C.Follow, (req: Request, res: Response, next: NextFunction) => { });
    UserRoute.post('/photo-update/', user_midwares.requireAuth,  User_C.SetPhoto, (req: Request, res: Response, next: NextFunction) => { });
    UserRoute.get('/add-rat/:noteId/', user_midwares.requireAuth, User_C.NoteAddRAT, (req: Request, res: Response, next: NextFunction) => { });

 
 
