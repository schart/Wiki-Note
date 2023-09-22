import * as utils from '../utils/util.cache.config';


export let precenceLogin: any = (username: string, email: string) => 
{

    return new Promise((resolve, reject) => 
    {
        utils.redis_client.lRange("usernames", 0, -1)
            .then((username_result: any) => 
            {
                utils.redis_client.lRange("emails", 0, -1)
                    .then((email_result: any) => 
                    {
                        // username_result.length + 1 for: ?
                        for (let i = 0; i < username_result.length + 1; i++) 
                        {
                            if (username == username_result[i] && email == email_result[i])  return resolve(true);
                            else return resolve(false);
                        }

                    })
                    .catch((_: null) => reject("email-error"))  

                })
                .catch((_: null) => reject("username-error"))  
            }
)
}

 