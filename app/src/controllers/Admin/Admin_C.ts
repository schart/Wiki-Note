import e, { Request, Response, NextFunction } from 'express';
import * as utils from "../../utils/utils";
import * as query_functions from '../../DB/Admin/Admin_Queries'
import jwtDecode from 'jwt-decode';

class Admin {


    Notification: any = async (req: Request, res: Response, next: NextFunction) => {
        //! Only admins can share notification or system of web server
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));
        console.log(req.body)
        await query_functions.SendNotification(token.Id, req.body.whoseId, req.body.message)
            .then((result: any) =>  { if (result == true) return res.status(200).json({ ok: true, result, msg: "Note validated and shared with public and secret user" }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })
        /* 
        do $$
    
        declare
            status INTEGER;
            
        begin
            SELECT _validstatus FROM public._notes into status where id = 1;
            
            IF (status = 0) -- that If equal one convert to 0 otherwise 1   
                    then  UPDATE public._notes SET _validstatus = 1 WHERE id = 1;
                    else UPDATE public._notes SET _validstatus = 0 WHERE id = 1;
            END IF;
    
        end $$
        */
    }
}

export = new Admin 