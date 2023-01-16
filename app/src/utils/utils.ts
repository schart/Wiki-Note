import multer  from 'multer'

// Multer, Using for get file from client
export const storagePdf = multer.diskStorage(
    {
    destination: function (req, file, cb) 
    {
        cb(null, './src/uploads/pdf/')
    },

    filename: function (req: any, file: any, cb: any) 
    {
        cb(null, file.originalname)
    }

});

export const storageProfile = multer.diskStorage(
    {
    destination: function (req, file, cb) 
    {
        cb(null, './src/uploads/profile/')
    },

    filename: function (req: any, file: any, cb: any) 
    {
        cb(null, file.originalname)
    }

});


export const fileFilter = (req: any, file: any, cb: any) => 
{
    //! if (file.mimetype != "application/pdf" && file.mimetype != "text/plain") 
    if (file.mimetype == "application/pdf") cb(null, true);
    else cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    
}

export const upload_pdf: any = multer({ storage: storagePdf,  fileFilter: fileFilter, limits: { fieldSize: 10 * (1024 * 1024) } });
export const upload_profile: any = multer({ storage: storageProfile,  fileFilter: fileFilter, limits: { fieldSize: 10 * (1024 * 1024) } });



const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export function generateString(length: number) 
{
    let result = ' ';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}