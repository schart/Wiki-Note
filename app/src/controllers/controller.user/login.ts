import { Request, Response, NextFunction } from "express";
import * as types from "../../selftypes/type.login";
import * as utils from "../../utils/util.generate.string";
import jwt from "jsonwebtoken";

class Login_Proccess {
  login = (req: Request, res: Response, next: NextFunction) => {
    const login: types.Login = req.body;
    const username: any = login.username;
    const email: any = login.email;
    const Id: number = res.locals.id;
    console.log("login: ", login);

    let payload = {
      Id,
      username,
      email,
      STRING_KEY: utils.generateString(20),
    };

    let token: any = jwt.sign(payload, req.app.get("SECRET_KEY"));

    res.cookie("token", token, { maxAge: 315000101, httpOnly: true });
    res.status(200).json({ ok: true, login, msg: "Login success" });
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.cookies.token;
    let decoded: any = jwt.decode(token);

    // We using for loop to get index num. of the list element
    /*utils.redis_client.lRange("usernames", -1, -1).then((result_username: any) => 
            {
                for (let i: any = 0; i<result_username.length; i++)
                {
                    if (result_username[i] == decoded.username)
                    {
                        utils.redis_client.lSet("usernames", i, '').then((res: any) => console.log(res))
                        console.log("Delete-ed username: ", result_username[i])
                    }
                    
                }
            
            })

        // Delete elements from cache for re-manuel login
        utils.redis_client.lRange("emails", -1, -1).then((result_email: any) => 
            {
                for (let i: any = 0; i<result_email.length; i++)
                {
                    if (result_email[i] == decoded.email)
                    {
                        utils.redis_client.lSet("emails", i, '').then((res: any) => console.log(res))
                        console.log("Delete-ed email: ", result_email[i])
                    }
                    
                }
            
            })*/

    res.cookie("token", "", { maxAge: 0, httpOnly: true });
    return res.status(200).json({ ok: true, msg: "Logout success" });
  };
}

export = new Login_Proccess();
