import fs from "fs";
import multer from 'multer';
import jwtDecode from 'jwt-decode';
import { Request, Response} from 'express';
import * as utils from '../../utils/utils';
import * as User_Queries from "../../DB/User_Queries/Insert/User";

class User{
    SetPhoto = 
    async (req: Request, res: Response) => { 
        const uploads: any = utils.upload_profile.single('photo');

        uploads(req, res, async (error: Error): Promise<any> => {
            if (error instanceof multer.MulterError) return res.status(400).json({ ok: false, message: error.message });            
            else if (error instanceof Error) return res.status(400).json({ ok: false, message: error.message });
            else {
                let token: any; 
                let fileName: any | undefined; 
                let extension: string | undefined; 

                token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))
                fileName = req.file?.filename
                extension =  "."+fileName.split(".")[1]

                if ((fs.existsSync(req.app.get("UPLOADS_PROFILE") + token.Id +  extension)) == true) fs.rmSync(req.app.get("UPLOADS_PROFILE") + token.Id + extension)
                //! maybe error of path            
                
                await User_Queries.SetPhoto(token.Id)
                    .then((result: any | undefined) => {
                        if (result == false) {
                            return res.status(400).json({ok: false, msg: "has got a error"}) 
                        }         

                        fs.renameSync(req.app.get("UPLOADS_PROFILE") + fileName,  req.app.get("UPLOADS_PROFILE") + token.Id + extension) 
                        return res.status(200).json({ok: true, msg: "has been successfuly"})

                    }).catch((error: Error) => console.log(error));            
            }
        
        })
    }


    Follow = 
    async (req: Request, res: Response) => { 
        let token: any;
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))

        await User_Queries.Follow_user(token.Id, req.body.followedId)
            .then((result: any) => {
                if (result == false) {
                    return res.status(400).json({ok: false, msg: "has been failed"}) 
                }  
                else {
                    return res.status(200).json({ok: true, msg: "has been successfuly"}) 
                }
            })
            .catch((error: Error) => console.log(error))
    }

    AddNote_ToRAT = 
    async (req:Request, res: Response) => {
        const NoteId = req.params.noteId;
        const token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));
        
        await User_Queries.AddNote_ToRAT(token.Id, NoteId)
            .then((result: any) => {
                if (result == false) {
                    return res.status(400).json({ok: false, msg: "has been failed"});
                }
                else {
                    return res.status(200).json({ok: true, msg: "has been successfuly"});
                }
            })
            .catch((error: Error) => console.log(error));
    };
};
export = new User;