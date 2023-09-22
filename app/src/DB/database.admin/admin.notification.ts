import * as config_postgres from "../../utils/util.postgresql.config"

export let sendNotification: any =  async (notificatorId:string, forwhoseId:string, message:string) => {
    return new Promise((resolve, reject) => 
    {
        config_postgres.posgres_client.query({
            text: `INSERT INTO u_notification(_notificatorid, _forwhoseid, _message) VALUES($1, $2, $3);`,
            values: [notificatorId, forwhoseId, message]
        })
        .then((result: any) => { if (result["rowCount"] == 1) resolve(true); else reject(false); })
        .catch((error: Error) => console.error(error));
    }

)};
