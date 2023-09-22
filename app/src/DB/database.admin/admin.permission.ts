import * as Models from '../../model/model.mongo/models';
import * as config_postgres from "../../utils/util.postgresql.config"

export let givePermission: any =  async (userId: any) => {
    return new Promise((resolve, reject) => {
        let status: Boolean;
     
        Models.Users.findOne({"_id": userId})
                .then((result: any) => 
                {
                    
                    if (result._Admin == true) status = false
                    else status = true;

                    Models.Users.updateOne({"_id": userId, "_Admin": status})
                        .then((result: any) =>  { if (result["acknowledged"] == true) return resolve(true); else return reject(false); })
                        .catch((error: Error) => console.log(error))      
                })
                .catch((error: Error) => console.log(error))

        
    })

}