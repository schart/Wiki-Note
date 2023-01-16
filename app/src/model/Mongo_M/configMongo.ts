// Mongo db; Using for none relation data
import configs from '../../config.json';
import mongoose from 'mongoose';

// Get config infos
let Config_Json: any = configs;

let DBurl: any = `mongodb://${Config_Json.Server.host}:${Config_Json.MongoDB.port}/${Config_Json.MongoDB.database}`
mongoose.connect(DBurl)
    .then((result: any) => console.log("Successfuly connected to MongoDB"))
    .catch((error: Error) => console.log(error))