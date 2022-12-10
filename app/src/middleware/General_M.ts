import { Request, Response, NextFunction } from 'express';



// check format of email 
export const is_valid_email = (req: Request, res: Response, next: NextFunction) => 
{
    console.log("is_valid_email: ", req.body)
    
    let email: any = req.body.email
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    if (regex.test(email) == true) return next();
    else { return res.status(400).json({ ok: false, message: "Format of email false" }); }

};
