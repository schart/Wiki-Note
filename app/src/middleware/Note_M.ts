import { Request, Response, NextFunction } from "express";
import * as utils from "../utils/utils"

export const presenceNote = async (req: Request, res: Response, next: NextFunction) => 
    {
        //! get note id for check in db
        let noteid: undefined | null; noteid = req.body.noteid;

        await utils.posgres_client.query("SELECT id FROM public._notes WHERE id = $1", [noteid])
        .then((result: any) => 
        { 
            if (result["rows"][0] != undefined) return next();
            else return res.status(401).json({ok: false, msg: "Post, Could not found"});
        })
        .catch((error: Error) => { console.log(error) })
    }
