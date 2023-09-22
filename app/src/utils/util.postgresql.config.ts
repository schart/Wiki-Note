import configs from '../config.json';
import { Pool } from 'pg';

// Get config infos
let Config_Json: any = configs

// PostgreSQL DB
const pool: Pool = new Pool({
    host: Config_Json.Server.host,
    port: Config_Json.PostgreSqlDB.port,
    user: Config_Json.PostgreSqlDB.user,
    database: Config_Json.PostgreSqlDB.database,
    password: Config_Json.PostgreSqlDB.password
    //ssl: true
})

export const posgres_client: Pool = pool
    posgres_client.connect()
        .then((_: any) => console.log('Successfuly connected to postgresDB'))
        .catch((error: Error) => { console.log(error); if (error) throw error })