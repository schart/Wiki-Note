import { Request, Response, NextFunction } from 'express';
import * as Models from '../../model/Mongo_M/Mongo';
import * as Cache from '../../Cache/Login-Register_Queries/Login-Register'


// pre check presence for login
export const presence_user_InRedis_login: any = async (req: Request, res: Response, next: NextFunction) => 

{
    console.log("PresenceUserInRedis Login:", req.body)
    const username: any = req.body.username;
    const email: any = req.body.email;

    await Cache.precenceLogin(username, email)
    .then((result: any) => 
    {
        if (result == true)
        {
            res.locals.username = req.body.username;
            res.locals.password = req.body.password;
            next();
        }    
        else res.status(400).json({ ok: false, msg: "User, could not found" })
    
    }).catch((error: any) => 
    {
        if (error == "email-error") res.status(400).json({ ok: false, msg: "Email error" })
        else res.status(400).json({ ok: false, msg: "username error" })
    });
    
}


export const password_auth: any = async (req: Request, res: Response, next: NextFunction) => 
{
    console.log("password_auth: ", res.locals)
    const username: any = res.locals.username;
    const password: any = res.locals.password;
    let Tostr, Tojson: any;

    const get_user_info: any = Models.Users.findOne({ username: username }, (error: Error, result: Object[]) => 
    {
        if (error) return res.status(400).json({ ok: false, error }) 
        else 
        {
            Tostr = JSON.stringify(result); Tojson = JSON.parse(Tostr); res.locals.id = Tojson._id // We take id from other midware, this data comes from db
            if (password == Tojson._Password) return next(); else return res.status(401).json({ ok: false, msg: 'password wrong' })
        }
    })
}



export const check_session_logout: any = async (req: Request, res: Response, next: NextFunction) => 
{   
    let token: string;
    token = JSON.stringify(req.cookies.token)
    
    if (token != undefined) return next()
    else return res.status(400).json({ ok: false, msg: "you are not have account already" })
}

 