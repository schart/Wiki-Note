import * as Models from '../../model/Mongo_M';
import fs from "fs" 



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