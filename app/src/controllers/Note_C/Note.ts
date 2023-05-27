import fs from 'fs';
import multer from 'multer';
import jwtDecode from 'jwt-decode';
import * as utils from '../../utils/utils';
import e, { Request, Response, NextFunction} from 'express';
import * as query_functions from "../../DB/Note_Queries/Insert/Note";

class Note {
    note_upload = 
    async (req: Request, res: Response, next: NextFunction) => {
        // For public
        const uploads: any = utils.upload_pdf.single('file');

        let body, 
        file_name: string | undefined, 
        title, 
        url;

        uploads(req, res, async (error: Error): Promise<any> => {
            if (error instanceof multer.MulterError) return res.status(400).json({ ok: false, message: error.message });
            else if (error instanceof Error) return res.status(400).json({ ok: false, message: error.message });
            else {
                const token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)))
                body = req.body; 
                file_name = req.file?.filename; 
                title = body.title; 
                url = body.url;

                //console.log("file name: ", file_name)
                //console.log("body: ", body)
                //console.log("token: ", token)

                await query_functions.Note_save(token.Id, [title, url, file_name])
                    .then((_: null) => {
                        fs.renameSync(req.app.get("UPLOADS_PDF") + file_name, req.app.get("UPLOADS_PDF") + token.Id + '_' + file_name);
                        return res.status(200).json({ ok: true, msg: "Success" })
                    })
                    .catch((error: Error) => {
                        if (fs.existsSync(req.app.get("UPLOADS_PDF") + token.Id + '_' + file_name) == false) {
                            return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" })
                        };
                        fs.rmSync(req.app.get("UPLOADS_PDF") + token.Id + '_' + file_name)
                    })
            };

        });

    };

    note_accept = 
    async (req: Request, res: Response, next: NextFunction) => {
        //! for admin
        let token: any; 
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        await query_functions.Note_accept(/*token.Id,*/ req.params.noteId)
            .then((result: boolean) =>  { 
                if (result == true) return res.status(200).json({ ok: true, result, msg: "Note validated and shared with public" }) 
            })
            .catch((error: Error) => { 
                return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) 
            })
    };


    note_delete = 
    async (req: Request, res: Response, next: NextFunction) => {
        //! for admin
        let token: any; 
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        await query_functions.Note_delete(req.params.noteId, token.Id)
            .then((result: boolean) => { 
                if (result == true) return res.status(200).json({ ok: true, msg: "has been deleted" }) 
            })
            .catch((error: Error) => { 
                return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) 
            })
    };


    note_comment = 
    async (req: Request, res: Response, next: NextFunction) =>  {
        //! for public
        let token: any; 
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));

        await query_functions.Note_comment(token.Id, req.body.noteId, req.body.comment)
            .then((result: boolean) => { 
                if (result == true) return res.status(200).json({ ok: true, msg: "has been shared" }) 
            })
            .catch((error: Error) => { 
                return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) 
            })
    };

    note_like = 
    async (req: Request, res: Response, next: NextFunction) => {
        //! for public   
        let token: any; 
        token = JSON.parse(JSON.stringify(jwtDecode(req.cookies.token)));
        
        await query_functions.Note_like(token.Id, req.body.noteId) 
            .then((result: boolean) => { 
                if (result == true) return res.status(200).json({ ok: true, msg: "has been liked" }) 
            })
            .catch((error: Error) => { 
                return res.status(400).json({ ok: false, error, msg: "there are problems please try again at later" }) 
            })
    };
};

export = new Note();
