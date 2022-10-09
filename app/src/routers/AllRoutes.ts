"use strict";
import express, { Request, Response, NextFunction, Application, Router } from 'express';

export const NoteRoute: Router = express.Router();
export const LoginRoute: Router = express.Router();
export const RegisterRoute: Router = express.Router();

// Controllers
import Login_C from '../controllers/Login_C';
import Register_C from '../controllers/Register_C';


// Midwares
import * as general_midwares from '../middleware/General_M';
import * as login_midwares from '../middleware/Login_M';
import * as register_midwares from '../middleware/Register_M';
import * as user_midwares from '../middleware/User_M';


RegisterRoute.post('/register-user', user_midwares.NorequireAuth, general_midwares.is_valid_email, register_midwares.presence_user_InRedis_register, Register_C.register, (req: Request, res: Response, next: NextFunction) => { });
LoginRoute.post('/login-user', user_midwares.NorequireAuth, general_midwares.is_valid_email, login_midwares.presence_user_InRedis_login, login_midwares.password_auth, Login_C.login, (req: Request, res: Response, next: NextFunction) => { });
LoginRoute.get('/logout-user', login_midwares.check_session_logout, Login_C.logout, (req: Request, res: Response, next: NextFunction) => { });

