import * as User_Queries from "../../DB/User/User_Queries"
import e, { Request, Response} from 'express';
import * as utils from '../../utils/utils';
import jwtDecode from 'jwt-decode';
import fs, { rename } from "fs"
import multer from 'multer';

class User
{
    SetPhoto: any = async (req: Request, res: Response) => 
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


    Follow: any = async (req: Request, res: Response) => 
    { 
        let token: any;
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))

        await User_Queries.Follow_user(token.Id, req.body.followedId)
        .then((result: any) => 
        {
            if (result == true) res.status(200).json({ok: true, msg: "has been success"})
            else return res.status(400).json({ok: false, msg: "has got a error"}) 
        })
        .catch((error: Error) => console.log(error))
    }

    AddNote_ToRAT: any = async (req:Request, res: Response) => 
    {
        let token: any;
        let NoteId: any = req.params.noteId;
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))
        
        await User_Queries.AddNote_ToRAT(token.Id, NoteId)
        .then((result: any) => 
        {
            if (result == true)  res.status(200).json({ok: true, msg: "has been success"});
            else return res.status(400).json({ok: false, msg: "has got a error"});
        })
        .catch((error: Error) => console.log(error))


    }
}


export = new User;