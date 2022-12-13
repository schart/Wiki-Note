import e, { Request, Response, NextFunction} from 'express';
import * as User_Queries from "../../DB/User/User_Queries"
import * as utils from '../../utils/utils';
import jwtDecode from 'jwt-decode';
import fs, { rename } from "fs"
import multer from 'multer';

class User
{

    SetPhoto: any = async (req: Request, res: Response, next: NextFunction) => 
    { 
        const uploads: any = utils.upload_profile.single('file');
        let token: any | undefined; let fileName: any | undefined; let mayFile: any | undefined; let extension: any | undefined | null; 

        uploads(req, res, async (error: Error): Promise<any> => 
        {
            if (error instanceof multer.MulterError) return res.status(400).json({ ok: false, message: error.message });
            
            else if (error instanceof Error) return res.status(400).json({ ok: false, message: error.message });
            else 
            {
                token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))
                fileName = req.file?.filename
                extension =  "."+fileName.split(".")[1]
        
                if ((fs.existsSync(req.app.get("UPLOADS_PROFILE") + token.Id +  extension)) == true) fs.rmSync(req.app.get("UPLOADS_PROFILE") + token.Id + extension)
                //! maybe error of path
            
                
                await User_Queries.SetPhoto(token.Id)
                .then((result: any | undefined) => 
                {
                    if (result == true) {fs.renameSync(req.app.get("UPLOADS_PROFILE") + fileName,  req.app.get("UPLOADS_PROFILE") + token.Id + extension), res.status(200).json({ok: true, msg: "has been updated profile photo"})}
                    else return res.status(400).json({ok: false, msg: "has got a error"}) 
                
                })
                .catch((error: Error) => console.log(error))
                
            }
        
        })
    }


    Follow: any = async (req: Request, res: Response, next: NextFunction) => 
    { 
        let token: any | undefined;
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))

        await User_Queries.Follow_user(token.Id, 1)
        .then((result: any | undefined) => 
        {
            if (result == true) { res.status(200).json({ok: true, msg: "has been success"})}
            else return res.status(400).json({ok: false, msg: "has got a error"}) 
        })
        .catch((error: Error) => console.log(error))
    }

    Notification: any = async (req: Request, res: Response, next: NextFunction) => 
    { 

        
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


export = new User;