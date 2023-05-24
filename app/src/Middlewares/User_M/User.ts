import { Request, Response, NextFunction } from 'express';
import * as Models from '../../model/Mongo_M/Mongo';
import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    /*
        This middlleware check status presence of session 
    */
    let token = JSON.stringify(req.cookies.token)

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
    /**
     * @param This middleware for check status login for redirect login
    **/
    let token;
    token = JSON.stringify(req.cookies.token)

    if (token == undefined) {
        return next(); // go other layer
    } else {
        return res.status(400).json({ ok: false, msg: "you are already have a account" })
    }
}


export const isAdminTrue = async (req: Request, res: Response, next: NextFunction) => {
    let token: any; 
    token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

    await Models.Users.findOne({ _id: token.Id })
        .then((result: any) => {
            if (result._Admin == false) return res.status(401).json({ ok: false, msg: "You don't have permission" })
            else console.log(result), next()
        })
        .catch((error: Error) => console.error(error))
}