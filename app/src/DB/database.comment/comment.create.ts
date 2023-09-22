import * as config_postgres from "../../utils/util.postgresql.config"


export const Note_comment: any = async (userid: number, noteid: number, comment: string) => 
{
    // main proccess completed 
    return new Promise((resolve, reject) => 
    {
        config_postgres.posgres_client.query(`INSERT INTO n_comment(_userid, _noteid, _comment) VALUES($1, $2, $3);`, [userid, noteid, comment]) 
            .then((result: any) => { if (result["rowCount"] == 1) resolve(true); else reject(false); })
            .catch((error: Error) => console.error(error))

    })
}