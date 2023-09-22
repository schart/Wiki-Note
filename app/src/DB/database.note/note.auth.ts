import * as config_postgres from "../../utils/util.postgresql.config"



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
