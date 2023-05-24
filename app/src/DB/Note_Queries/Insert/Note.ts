import * as config_redis from "../../../Cache/configCache"
import * as config_postgres from "../../configDB"

export const Note_save: Function = async (userid: number, value: any): Promise<boolean> => {
    let lastInsertID: number = 0;
  
    try {
      const titleInsertResult = await config_postgres.posgres_client.query(
        `INSERT INTO N_Title(_Title) VALUES($1) RETURNING id;`,
        [value[0]]
      );
  
      if (titleInsertResult.rows.length === 0) {
        return Promise.reject(false);
      };
  
      lastInsertID = titleInsertResult.rows[0].id;
  
      await Promise.all([
        config_postgres.posgres_client.query(`INSERT INTO N_Url(_UrlN) VALUES($1);`, [value[1]]),
        config_postgres.posgres_client.query(`INSERT INTO N_Url(_UrlN) VALUES($1);`, [value[2]]),
        config_postgres.posgres_client.query(
          `INSERT INTO _Notes(_UserID, _TitleID, _UrlID, _FileNID) VALUES($1, $2, $3, $4);`,
          [userid, lastInsertID, lastInsertID, lastInsertID]
        ),
      ]);
  
      return Promise.resolve(true);
      
    } catch (error) {
      return Promise.reject(false);
    }
  };
  



export const Note_delete: Function = async (noteid: number, deleter: number): Promise<boolean> => 
{
    return new Promise ((resolve, reject) => {
        const query = config_postgres.posgres_client.query(`DELETE FROM _notes WHERE id = $1;`, [noteid]);

        query.then((result: any) => { 
            if (result["rowCount"] == 1) {
                // Delete in redis (cache) too
                config_redis.redis_client.SREM('confirmedNotes', `${noteid}`)
                resolve(true);
            } 
            else reject(false); 
        })  
        .catch((error: any) => console.error(error))
    }
)}

export const Note_accept: Function = async (/*accepter: string,*/ noteid: number): Promise<boolean> => 
{ 
    return new Promise((resolve, reject) => {
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
            })
            .then((result: any) =>  { 
                    if (result["command"] == "DO") return resolve(true);
                    else reject(false);   
                
            }).catch((error: Error) => console.error(error))
    })
}


export const Note_like: Function = async (userid: number, noteid: number): Promise<boolean> => 
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

            .then((result: any) => { 
                if (result["command"] == "DO") resolve(true); 
                else reject(false); 
            })
            .catch((error: Error) => console.error(error))
    })

}



export const Note_comment: Function = async (userid: number, noteid: number, comment: string): Promise<boolean> => 
{
    // main proccess completed 
    return new Promise((resolve, reject) => 
    {
        config_postgres.posgres_client.query(`INSERT INTO n_comment(_userid, _noteid, _comment) VALUES($1, $2, $3);`, [userid, noteid, comment]) 
            .then((result: any) => { 
                if (result["rowCount"] == 1) resolve(true); 
                else reject(false); 
            })
            .catch((error: Error) => console.error(error))

    })
}

