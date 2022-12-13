import e, { Request, Response, NextFunction, Application, request, response } from 'express';
import * as types from '../../selftypes/types';
import * as utils from '../../utils/utils';
import * as Models from '../../model/Mongo_M';
import jwt from 'jsonwebtoken'

class Register_Proccess 
{

    register: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        const register: types.Register = req.body;
        console.log("Register: ", register)

        const save_user: any = new Models.Users(
            {
                _Username: register.username,
                _Email: register.email,
                _PpName: "default.jpg",
                _Password: register.password
            }

        // Save user to mongodb
        ).save()  
            .then((result: any) => 
                {
                    // Transformation proccess
                    const Tostring: any = JSON.stringify(result);
                    const Tojson: any = JSON.parse(Tostring);
                    
                    const username: any = Tojson._Username;
                    const email: any = Tojson._Email;
                    const Id: number = Tojson._id;
                    
                    // Data push in redis cache. For block non-recommended request

                    // Data Push in usernames on Redis
                    utils.redis_client.lPush("usernames", username)
                        .then((result: any) => console.log("User Name save to Redis"))
                        .catch((error: Error) => console.log(error))

                    // Data Push in emails on Redis
                    utils.redis_client.lPush("emails", email)
                        .then((result: any) => console.log("User Email save to Redis"))
                        .catch((error: Error) => console.log(error))


                    let payload = // share data as jwt token in session for blocking re-login to user
                        {
                            Id,
                            username,
                            email,
                            STRING_KEY: utils.generateString(20)
                        }

                    let token: any = jwt.sign(payload, req.app.get('SECRET_KEY'));

                    return res.status(200).cookie('token', token, { maxAge: 315000101, httpOnly: true }).json({ ok: true, result, msg: "User saved" });
                })

            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: 'error in register' }) })
    };

}

export = new Register_Proccess();
