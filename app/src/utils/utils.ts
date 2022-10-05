import { createConnection, QueryError, RowDataPacket } from "mysql2";
import { createClient } from 'redis';
import { config } from '../config'
import mongoose from 'mongoose';

// Mysql db
export const db: any = createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port
});

// Mongo db
let DBurl: any = 'mongodb://localhost:27017/Note'
mongoose.connect(DBurl)
  .then((result: any) => { console.log("result") })
  .catch((error: Error) => { console.log(error) })

/*
// Redis db
export let client = createClient({ url: 'redis://localhost:6379' });
client.on('error', (error: Error) => console.log('Redis Client Error', error));
client.connect();


*/


