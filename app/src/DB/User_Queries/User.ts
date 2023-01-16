import * as Models from '../../model/Mongo_M/Mongo';
import * as config_postgres from "../../DB/configDB"



export let SetPhoto: any =  async (id: string | null) => 
{
    
    return new Promise((resolve, reject) => 
    {
    
        Models.Users.updateOne({"_id": id, "_PpName": id})
            .then((result: any) => 
            {
                if (result["acknowledged"] == true) return resolve(true);
                else return reject(false);
            }) 
            .catch((error: Error) => console.log(error)) 
            
    })  
};


export let Follow_user: any = async (followerId: any, followedId: any) =>
{

    return new Promise((resolve, reject) => 
    {
        config_postgres.posgres_client.query
        ({
            text: `
                    DO $$

                        DECLARE 
                            _result BOOLEAN;
                            followerID VARCHAR := ${followerId};
                            followedID VARCHAR := ${followedId};
                    
                        BEGIN
                            
                            SELECT _status FROM public.u_follow INTO _result WHERE _followerId = followerID AND _followedId = followedID;
                            
                            IF NOT FOUND
                                THEN INSERT INTO public.u_follow(_followerid, _followedid, _status) VALUES(followerID, followedID, TRUE);
                                ELSE 
                                    IF (_result = FALSE)
                                        THEN UPDATE public.u_follow SET _status = TRUE WHERE _followerId = followerID AND _followedId = followedID;
                                        ELSE UPDATE public.u_follow SET _status = FALSE WHERE _followerId = followerID AND _followedId = followedID;
                                    END IF;
                            
                            END IF;
                    END $$ 
            `            
        }).then((result: any) => { if (result["command"] == "DO") return resolve(true); else return reject(false); }) 
        .catch((error: Error) => console.log(error)) 


    })

}


export let AddNote_ToRAT: any = (UserId: string, NoteId: number) => 
{
    return new Promise((resolve, reject) => 
    {
        config_postgres.posgres_client.query
        ({
            text: `
                DO $$

                    DECLARE 
                        _result INT;
                        UserId TEXT := 7;
                        NoteId INT := 2;
                
                    BEGIN
                        
                        SELECT id FROM public.u_readatlater INTO _result WHERE _userid = UserId AND _noteid = NoteId AND _status = TRUE;
                        
                        IF NOT FOUND
                            THEN INSERT INTO public.u_readatlater(_userid, _noteid, _status) VALUES(UserId, NoteId, TRUE);
                            ELSE UPDATE  public.u_readatlater SET _status = FALSE WHERE id = _result; -- 'would Keep for delete';

                        END IF;
                END $$ 
            `            
        }).then((result: any) => 
        {
            if (result["command"] == "DO") return resolve(true); else return reject(false);
        }) 
        .catch((error: Error) => console.log(error)) 

    })

}   