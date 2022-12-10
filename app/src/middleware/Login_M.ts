import express, { Request, Response, NextFunction, Application, Router } from 'express';
import * as  utils from '../utils/utils';
import * as Models from '../model/Mongo_M';
import jwt_decode from "jwt-decode";

// pre check presence for login
export const presence_user_InRedis_login: any = async (req: Request, res: Response, next: NextFunction) => 

{
    console.log("PresenceUserInRedis Login:", req.body)
    const username: any = req.body.username;
    const email: any = req.body.email;

    utils.redis_client.lRange("usernames", 0, -1)
        
    .then((username_result: any) => 
        {
            utils.redis_client.lRange("emails", 0, -1)       
            .then((email_result: any) => 
                    {
                        // username_result.length + 1 for: ?
                        for (let i = 0; i < username_result.length + 1; i++) 
                            {
                                // if is there username and email in redis when return false for register
                                if (username == username_result[i] && email == email_result[i]) 
                                    {
                                        res.locals.username = req.body.username;
                                        res.locals.password = req.body.password;
                                        return next()
                                    } 
                            
                                else return res.status(401).json({ ok: false, msg: "User not found" })
                            } 

                    }).catch((error_email: any) => { return res.status(400).json({ ok: false, error_email }) })

        }).catch((error_username: any) => { return res.status(400).json({ ok: false, error_username }) })
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
            Tostr = JSON.stringify(result)
            Tojson = JSON.parse(Tostr) // json of result data
            res.locals.id = Tojson._id // We take id from other midware, this data comes from db
            
            if (password == Tojson._Password)  return next()
            else return res.status(401).json({ ok: false, msg: 'password wrong' })
        }
    })
}



export const check_session_logout: any = async (req: Request, res: Response, next: NextFunction) => 
{   
    let token: string;
    token = JSON.stringify(req.cookies.token)
    console.log("check_session_logout: ", req.cookies.token)
    
    if (token != undefined) return next()
    else return res.status(400).json({ ok: false, msg: "you are not have account already" })
}




/*
export const login_auth = (req: Request, res: Response, next: NextFunction) => 

{
    console.log("login_auth: ")
    let register: any = req.body

    const check_presence_username: any = Models.Users.findOne({ username: register.username }, (error_username: Error, result_username: Object[]) => 
    {

        if (error_username)  return res.status(400).json({ ok: false, error_username }) 
        if (result_username == null) return res.status(400).json({ ok: false, msg: "wrong Username" })

        else 
        {
            const check_presence_email: any = Models.Users.findOne({ email: register.email }, (error_email: Error, result_email: Object[]) => 
            {
               if (error_email) return res.status(400).json({ ok: false, error_email }) 
               if (result_email == null) return res.status(400).json({ ok: false, msg: "Wrong Email" }) 

                else 
                {
                    const Tostring: any = JSON.stringify(result_email);
                    const Tojson: any = JSON.parse(Tostring);
                    res.locals._id = Tojson._id;
                    return next();
                }


            })

        }


    })
};*/