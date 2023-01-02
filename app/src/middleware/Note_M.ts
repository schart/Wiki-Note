import { Request, Response, NextFunction } from "express";
import * as utils from "../utils/utils"

export const PresenceConfirmedNote = async (req: Request, res: Response, next: NextFunction) => 
    {
        //! get note id for check in db
        let noteid: undefined | null | string; noteid = req.params.noteId;

        await utils.redis_client.SMEMBERS("confirmedNotes")
        .then((result: any) => 
        { 
            for (let i=0; i < result.length; i++)
            {
                console.log(result[i])

                if (result[i] == noteid)
                {
                    return next();
                }
                else return res.status(401).json({ok: false, msg: "Confirmed Post, Could not found"});
            }
        })
        .catch((error: Error) => { console.log(error) })

    }


    export const PresenceUnConfirmedNote = async (req: Request, res: Response, next: NextFunction) => 
    {
        //! get note id for check in db
        let noteid: undefined | null | string; noteid = req.params.noteId;

        await utils.redis_client.SMEMBERS("unconfirmedNotes")
        .then((result: any) => 
        { 
            for (let i=0; i < result.length; i++)
            {
                console.log("noteId: ", noteid)
                console.log(result[i])

                if (result[i] == noteid)
                {
                    return next();
                }
                else return res.status(401).json({ok: false, msg: "UnConfirmed  Post, Could not found"});
            }
        })
        .catch((error: Error) => { console.log(error) })

    
    }
