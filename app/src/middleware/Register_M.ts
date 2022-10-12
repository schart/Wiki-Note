import express, { Request, Response, NextFunction, Application, Router } from 'express';
import * as  utils from '../utils/utils';

// precheck presence for register
export const presence_user_InRedis_register = (req: Request, res: Response, next: NextFunction) => 
{
    console.log("presence_user_InRedis_register: ", req.body)
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
                            if (username == username_result[i]) return res.status(401).json({ ok: false, msg: "Already Username" })
                            else if (email == email_result[i]) return res.status(401).json({ ok: false, msg: "Already Email" })
                            else return next()
                        }


                }).catch((error_email: any) => { return res.status(400).json({ ok: false, error_email }) })

        }).catch((error_username: any) => { return res.status(400).json({ ok: false, error_username }) })
}



/*
export const register_auth = (req: Request, res: Response, next: NextFunction) => {
    let register: any = req.body

    const check_presence_username: any = Users.findOne({ username: register.username }, (error: Error, result: Object[]) => {
        if (error) { res.status(400).json({ ok: false, error }) }

        if (result != null) { return res.status(400).json({ ok: false, msg: "That username taken from before" }) }

        else {

            const check_presence_email: any = Users.findOne({ email: register.email }, (error: Error, result: Object[]) => {
                if (error) { res.status(400).json({ ok: false, error }) }
                if (result != null) { return res.status(400).json({ ok: false, msg: "That Email taken from before" }) }

                else {
                    console.log('[register_auth] next to other layer')
                    return next();
                }


            })

        }


    })
};*/