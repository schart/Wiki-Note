import * as admin_query from '../../DB/Admin_Queries/Insert/Admin';
import e, { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';

class Admin 
{ 

    Notification: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        //! Only admins can share notification or system of web server
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        await admin_query.sendNotification(token.Id, req.body.whoseId, req.body.message)
            .then((result: any) =>  { if (result == true) return res.status(200).json({ ok: true, result, msg: "Notification and shared with public" }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })
    };

    ReportPost: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));
        
        await admin_query.reportNote(req.body.noteid, token.Id)
            .then((result: any) =>  { if (result == true) return res.status(200).json({ ok: true, result, msg: "Note reported." }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })
    };

}

export = new Admin 