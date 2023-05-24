import express, { Request, Response, NextFunction, Application, Router } from 'express';
import * as  Cache from '../../Cache/Login-Register_Queries/Login-Register';

// precheck presence for register
export const presence_user_InRedis_register = async (req: Request, res: Response, next: NextFunction) => {
    const username: any = req.body.username; const email: any = req.body.email;

    await Cache.precenceRegister(username, email)
        .then((result: any) => {
            if (result == "already-username") res.status(401).json({ ok: false, msg: "Already Username" }); 
            else if (result == "already-email") res.status(401).json({ ok: false, msg: "Already Email" });
            else next();

        }).catch((error: any) => {
            if (error == "email-error") res.status(401).json({ ok: false, msg: "Email error" }); 
            else if (error == "username-error") res.status(401).json({ ok: false, msg: "Username error" });
        });
};