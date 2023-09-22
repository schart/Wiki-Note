"use strict"; import express, { Request, Response, NextFunction, Router } from 'express';

// Routers
export const AdminRoute: Router = express.Router();

// Controllers
import Admin_C from '../controllers/controller.admin/admin'

// Midware
import * as user_midwares from '../Middlewares/token/middleware.token';

//? Admin process
AdminRoute.post("/notification/", /* admin */  user_midwares.requireAuth, user_midwares.isAdminTrue, Admin_C.Notification, (req: Request, res: Response, next: NextFunction) => { })
AdminRoute.post("/report-note/",  /* admin */ user_midwares.requireAuth, user_midwares.isAdminTrue, Admin_C.ReportPost, (req: Request, res: Response, next: NextFunction) => { })
AdminRoute.get("/give-permission/:userId",  /* admin */ user_midwares.requireAuth, user_midwares.isAdminTrue, Admin_C.GivePermission, (req: Request, res: Response, next: NextFunction) => { })
