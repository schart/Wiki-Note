import * as config_redis from "../../utils/util.cache.config"
import * as config_postgres from "../../utils/util.postgresql.config"


 

export const Note_delete: any = async (noteid: number, deleter: number) => 
{

    // Main proccess completed
    return new Promise ((resolve, reject) => 
    {
        config_postgres.posgres_client.query(`DELETE FROM _notes WHERE id = $1;`, [noteid])
            .then((result: any) => 
            { 
                if (result["rowCount"] == 1) 
                {
                    config_redis.redis_client.SREM('confirmedNotes', `${noteid}`)
                    resolve(true);
                } 
                else reject(false); 
            })  
            .catch((error: any) => console.error(error))
    }
)}


 

