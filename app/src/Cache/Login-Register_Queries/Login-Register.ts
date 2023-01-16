import * as utils from '../../Cache/configCache';


export let precenceLogin: any = (username: any, email: any) => 
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
                            if (username == username_result[i] && email == email_result[i])  resolve(true);
                            else resolve(false);
                        }

                    })
                    .catch((error_email: any) => reject("email-error"))  

                })
                .catch((error_username: any) => reject("username-error"))  
            }
)
}


export let precenceRegister: any = (username: any, email: any) => 
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
                            // if is there username and email in redis when return false for register
                            if (username == username_result[i]) resolve("already-username")  
                            else if (email == email_result[i]) resolve("already-email")   
                            else resolve(true)  
                        }


                }).catch((error_email: any) => reject("email-error")) //return res.status(400).json({ ok: false, error_email })  

        }).catch((error_username: any) =>  reject("username-error")) //return res.status(400).json({ ok: false, error_username })  

    })

}