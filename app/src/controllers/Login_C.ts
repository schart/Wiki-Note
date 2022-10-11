import express, { Request, Response, NextFunction, Application, Router } from 'express';
import * as types from '../selftypes/types';
import * as utils from "../utils/utils"
import jwt from 'jsonwebtoken'

class Login_Proccess {
    login = (req: Request, res: Response, next: NextFunction) => {

        const login: types.Login = req.body;


        const username: any = login.username;
        const email: any = login.email;
        const Id: number = res.locals._id;

        let payload =
        {
            Id,
            username,
            email,
            STRING_KEY: utils.generateString(20)
        }

        let token: any = jwt.sign(payload, req.app.get('SECRET_KEY'));

        res.cookie('token', token, { maxAge: 315000101, httpOnly: true, });
        res.status(200).json({ ok: true, login, msg: "Login success" })

    }




    logout = (req: Request, res: Response, next: NextFunction) => {

        res.cookie('token', '', { maxAge: 0, httpOnly: true });
        return res.status(200).json({ ok: true, msg: 'Logout success' })
    }
}

export = new Login_Proccess();
