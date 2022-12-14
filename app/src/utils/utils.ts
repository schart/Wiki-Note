import multer, { FileFilterCallback } from 'multer'
import { createClient } from 'redis';
import configs from '../config.json';
import { Pool, Client } from 'pg';
import mongoose from 'mongoose';


// Get config infos
let Config_Json: any = configs

// PostgreSQL DB
const pool: any = new Pool({
    host: Config_Json.Server.host,
    port: Config_Json.PostgreSqlDB.port,
    user: Config_Json.PostgreSqlDB.user,
    database: Config_Json.PostgreSqlDB.database,
    password: Config_Json.PostgreSqlDB.password
    //ssl: true
})

export const posgres_client: any = pool
    posgres_client.connect()
        .then((result: any) => 
        {
            console.log('Successfuly connected to postgresDB');

        }).catch((error: Error) => 
        {
            console.log(error)
            if (error) throw error;
        });


// Mongo db; Using for none relation data
let DBurl: any = `mongodb://${Config_Json.Server.host}:${Config_Json.MongoDB.port}/${Config_Json.MongoDB.database}`
mongoose.connect(DBurl)
    .then((result: any) => console.log("Successfuly connected to MongoDB"))
    .catch((error: Error) => console.log(error))



// Redis db; Using for keep data in cache
export let redis_client = createClient({ url: `redis://${Config_Json.Server.host}:${Config_Json.Redis.port}` });
redis_client.on('error', (error: Error) => console.log('Redis Client Error', error));
redis_client.on('connect', (result: any) => console.log('Successfuly connected to Redis Cache'));
redis_client.connect();


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
    if (true)   
    {
        cb(null, true);
    } 
    else 
    {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
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
