import * as Models from '../../model/Mongo_M';
import * as utils from "../../utils/utils"



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
        utils.posgres_client.query
        ({
            text: `
                    DO $$

                        DECLARE 
                            _result BOOLEAN;
                            followerID int := ${followerId};
                            followedID int := ${followedId};
                    
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
        }).then((result: any) => 
        {
            if (result["command"] == "DO") return resolve(true);
            else return reject(false);
        }) 
        .catch((error: Error) => console.log(error)) 


    })

}