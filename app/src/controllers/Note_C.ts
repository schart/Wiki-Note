import e, { Request, Response, NextFunction} from 'express';
import * as query_functions from "../DB/Note/Note_Queries";
import * as utils from '../utils/utils';
import jwtDecode from 'jwt-decode';
import fs, { stat } from 'fs';
import multer from 'multer';

class Note {

    note_upload: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        // For public
        const uploads: any = utils.upload_pdf.single('file');
        let body, file_name: string | undefined | any, title, url;
        let token: any;

        uploads(req, res, async (error: Error): Promise<any> => 
        {

            if (error instanceof multer.MulterError) return res.status(400).json({ ok: false, message: error.message });

            else if (error instanceof Error) return res.status(400).json({ ok: false, message: error.message });
            else {
                token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))
                file_name = req.file?.filename
                body = req.body
                title = body.title
                url = body.url

                console.log("file name: ", file_name)
                console.log("body: ", body)
                console.log("token: ", token)

                // Get promise from Note_save function
                await query_functions.Note_save(token.Id, [title, url, file_name])
                    .then((result: any) => 
                    {
                        fs.renameSync(req.app.get("UPLOADS_PDF") + file_name, req.app.get("UPLOADS_PDF") + token.Id + '_' + file_name);
                        return res.status(200).json({ ok: true, msg: "Success" })
                    })
                    .catch((error: any) => 
                    {
                        if (fs.existsSync(req.app.get("UPLOADS_PDF") + token.Id + '_' + file_name) == true) fs.rmSync(req.app.get("UPLOADS_PDF") + token.Id + '_' + file_name);
                        return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" })
                    })
            };

        });

    }

    note_accept: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        // for admin
        //! check presence of note in midware
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        // accepter and note Id 
        //let result: any = query_functions.Note_accept(token.Id, req.body.noteid)
        await query_functions.Note_accept(/*token.Id,*/ req.body.noteid)
            .then((result: any) =>  { if (result == true) return res.status(200).json({ ok: true, result, msg: "Note validated and shared with public" }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })
    }

    note_delete: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        // for admin
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        await query_functions.Note_delete(req.body.noteid, token.Id)
            .then((result: any) => { if (result == true) return res.status(200).json({ ok: true, msg: "has been deleted" }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })
    }

    note_comment: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        // for public
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        await query_functions.Note_comment(token.Id, req.body.noteid, req.body.comment)
            .then((result: any) => { if (result == true) return res.status(200).json({ ok: true, msg: "has been shared" }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })
    }

    note_like: any = async (req: Request, res: Response, next: NextFunction) => 
    {
        // for public
        let token: any; token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));
        console.log(req.body)
        await query_functions.Note_like(token.Id, req.body.noteid) 
            .then((result: any) => 
            { if (result == true) return res.status(200).json({ ok: true, msg: "has been liked" }) })
            .catch((error: Error) => { return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) })

    }


}
export = new Note();
