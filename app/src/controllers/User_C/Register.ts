
import jwt from 'jsonwebtoken'
import * as types from '../../selftypes/types';
import * as config_general from '../../utils/utils';
import * as Models from '../../model/Mongo_M/Mongo';
import * as config_redis from '../../Cache/configCache';
import { Request, Response, NextFunction } from 'express';

class Register_Proccess {
    register = async (req: Request, res: Response, next: NextFunction) => {
        const register: types.Register = req.body;

        const save_user: any = new Models.Users({
                _Username: register.username,
                _Email: register.email,
                _PpName: "default.jpg",
                _Password: register.password
        })
            
        save_user().save().then((result: any) => {
            // Transformation proccess
            const Tostring: any = JSON.stringify(result);
            const Tojson: any = JSON.parse(Tostring);
            
            const username: any = Tojson._Username;
            const email: any = Tojson._Email;
            const Id: number = Tojson._id;
            
            // Data push in redis cache. For block non-recommended request

            // Data Push in usernames on Redis
            config_redis.redis_client.lPush("usernames", username)
                .then((_) => console.log("User Name save to Redis"))
                .catch((error: Error) => console.log(error))

            // Data Push in emails on Redis
            config_redis.redis_client.lPush("emails", email)
                .then((_) => console.log("User Email save to Redis"))
                .catch((error: Error) => console.log(error))


            let payload = {
                // share data as jwt token in session for blocking re-login to user
                Id,
                username,
                email,
                STRING_KEY: config_general.generateString(20)
            };

            let token: any;
            token = jwt.sign(payload, req.app.get('SECRET_KEY'));
            return res.status(200).cookie('token', token, { maxAge: 315000101, httpOnly: true }).json({ ok: true, result, msg: "User saved" });
        })
        .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: 'error in register' }) })
    };
};

export = new Register_Proccess();
