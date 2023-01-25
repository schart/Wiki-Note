import * as config_postgres from "../../DB/configDB"

export let sendNotification: any =  async (notificatorId:string, forwhoseId:string, message:string) => 
{
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

export let reportNote: any =  async (noteid: any, reporterid: any) => 
{
    return new Promise((resolve, reject) => 
    {
        config_postgres.posgres_client.query({
            text: `
                DO $$
                
                    DECLARE status BOOLEAN;
                    DECLARE noteid INTEGER := ${noteid};
                    DECLARE reporterid VARCHAR := ${reporterid};

                    BEGIN 
                            SELECT _reportstatus FROM public.N_Reported INTO status WHERE _noteid = Noteid;

                            IF NOT FOUND  
                                    THEN INSERT INTO public.N_Reported(_reporterid, _noteid, _reportstatus) VALUES(reporterid, noteid, TRUE);
                                    ELSE IF (status = FALSE)   
                                        THEN  UPDATE public.N_Reported SET _reportstatus = TRUE WHERE _noteid = Noteid;
                                        ELSE  UPDATE public.N_Reported SET _reportstatus = FALSE WHERE _noteid = Noteid;
                                    END IF;
                            END IF;
                END $$;
            `,
        })
        .then((result: any) => { if (result["command"] == "DO") resolve(true); else reject(false); })
        .catch((error: Error) => console.log("error: ", error));
    })
}