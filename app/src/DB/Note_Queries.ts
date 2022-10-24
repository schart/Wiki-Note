import * as utils from "../utils/utils"


/* 
    We make self libary for CRUD proccess 
*/

export const Note_save: any = (userid: number, value: any) => 
{
    let lastInsert: number = 0; 
    
    utils.posgres_client.query(`INSERT INTO N_Title(_Title) VALUES($1); `, [value[0]])
    .then((result: any) => console.log(result))
    .catch((error: any) => console.log(error))

    utils.posgres_client.query(`INSERT INTO N_Url(_UrlN) VALUES($1); `, [value[1]])
    .then((result: any) => console.log(result))
    .catch((error: any) => console.log(error))

    utils.posgres_client.query(`INSERT INTO N_File(_FileN) VALUES($1) returning id; `, [value[2]])
    
    .then((result: any) => 
    {   
        lastInsert = result["rows"][0].id

        utils.posgres_client.query(`INSERT INTO _Notes(_UserID, _TitleID, _UrlID, _FileNID) VALUES($1, $2, $3, $4);`, [userid, lastInsert, lastInsert, lastInsert, ])
            .then((result: any) => console.log(result))
            .catch((error: any) => console.log(error)) 
    
    })
    .catch((error: any) => console.log(error))

}
