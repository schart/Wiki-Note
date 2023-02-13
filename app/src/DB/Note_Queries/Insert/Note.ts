import * as config_redis from "../../../Cache/configCache"
import * as config_postgres from "../../configDB"

//!  We will do self libary for CRUD proccess for SAVE!


export const Note_save: any = async (userid: number, value: any) => 
{
    let  GetResult: any | undefined = null;
    let lastInsertID: number  = 0;

    return new Promise((resolve, reject) => 
    {
        // Upload titlte to DB
        config_postgres.posgres_client.query(`INSERT INTO N_Title(_Title) VALUES($1) returning id;`, [value[0]], (error: Error, result: Object[]) => 
        {
            if (error) throw error; // if there is/are error
            
            if (result != undefined) 
            { 
                GetResult = result; lastInsertID = GetResult["rows"][0].id;
                
                //! I will do refactoring code which in below
                try 
                {
                    console.log(lastInsertID)
                    config_postgres.posgres_client.query(`INSERT INTO N_Url(_UrlN) VALUES($1);`, [value[1]])
                    config_postgres.posgres_client.query(`INSERT INTO N_Url(_UrlN) VALUES($1);`, [value[2]])
                    config_postgres.posgres_client.query(`INSERT INTO _Notes(_UserID, _TitleID, _UrlID, _FileNID) VALUES($1, $2, $3, $4);`, [userid, lastInsertID, lastInsertID, lastInsertID])

                    resolve(true);
                }
                catch { reject(false) }

            } else reject(false);
        }
    )}
)}




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



export const Note_accept: any = async (/*accepter: string,*/ noteid: number) => 
{ 
    // Main proccess completed
    return new Promise((resolve, reject) => 
    {
            config_postgres.posgres_client.query({
                text: `
                        DO $$
            
                            DECLARE status BOOLEAN;
                            DECLARE Noteid INTEGER := ${noteid};

                            BEGIN  

                                SELECT _validstatus FROM public._notes INTO status WHERE id = Noteid;
                                
                                    IF (status = FALSE)   
                                            THEN  UPDATE public._notes SET _validstatus = TRUE WHERE id = Noteid; raise notice 'hello';
                                            ELSE  UPDATE public._notes SET _validstatus = FALSE WHERE id = Noteid;
                                    END IF;
                        END $$;
                    `
            }).then((result: any) =>  
                { 
                    if (result["command"] == "DO") return resolve(true);
                    else reject(false);   
                
                }).catch((error: Error) => console.error(error))
    })
}


export const Note_like: any = async (userid: number, noteid: number) => 
{    
    // Main proccess completed
    return new Promise((resolve, reject) => 
    {

        config_postgres.posgres_client.query({

        text: `
            DO $$             
                DECLARE Status BOOLEAN;
                DECLARE _Result INTEGER;
                DECLARE UserId VARCHAR:= ${userid};
                DECLARE NoteId INTEGER:= ${noteid};
            
                BEGIN 
                    SELECT id FROM public.n_like INTO _Result WHERE _noteid = NoteId AND _userid = UserId;
                    
                    IF NOT FOUND 
                        THEN  INSERT INTO public.n_like(_userid, _noteid, _liken) VALUES(UserId, NoteId, TRUE);
                        
                        ELSE  SELECT _liken FROM public.n_like INTO Status WHERE _noteid = NoteId AND _userid = UserId;
                                
                            IF (Status = TRUE)  
                                        THEN UPDATE public.n_like SET _liken = FALSE WHERE _noteid = NoteId AND _userid = UserId;
                                        ELSE UPDATE public.n_like SET _liken = TRUE  WHERE _noteid = NoteId AND _userid = UserId;
                                END IF;
                    END IF;
            END $$;
            `
        })

            .then((result: any) =>   { console.log(result); if (result["command"] == "DO") resolve(true); else reject(false); })
            .catch((error: Error) => console.error(error))
    })

}



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

