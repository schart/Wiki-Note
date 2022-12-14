import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    /*
        This middlleware check status presence of session 
    */

    let token = JSON.stringify(req.cookies.token)
    console.log('midware: ', token)

    if (token != undefined) return next();
    else return res.status(400).json({ ok: false, msg: "Token is not you are not authorized to that proccess." });
}


export const verify = (req: Request, res: Response, next: NextFunction) => {
    /*
        Check token truth status
    */

    let token = JSON.stringify(req.cookies.token)

    if (!token)
        res.status(400).json({ ok: false, msg: "Token is not found." });

    else {
        jwt.verify(token, req.app.get("SECRET_KEY"), (error: any, decoded: any) => {
            if (error)
                res.status(400).json({ ok: false, error });


            else {
                res.status(200).json({ ok: true, decoded, msg: "Token is found." });
                next();
            }
        });
    }
};

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
    /*
        Get current user in session 
    */

    let token = JSON.stringify(req.cookies.token)

    if (token != undefined) {
        try {
            const decoded = jwt.verify(token, req.app.get('SECRET_KEY'));
            res.locals.current_user = decoded;
            return next();
        } catch (e) {
            res.locals.current_user = null;
            return next();
        }
    } else {
        res.locals.current_user = null;
        return next();
    }
};



export const NorequireAuth = (req: Request, res: Response, next: NextFunction) => {
    /*
        This middleware for check status login for redirect login

    */

    let token = JSON.stringify(req.cookies.token)
    console.log('midware: ', token)

    if (token == undefined) {
        console.log("[NorequireAuth] next the layer")
        return next(); // go other layer
    } else {
        return res.status(400).json({ ok: false, msg: "you are already have a account" })
    }
}