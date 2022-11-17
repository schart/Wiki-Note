import * as utils from "../../utils/utils"
//import * as DeleterFuncs from "../DB/Note_Queries_Delete" 

/* 
    We will do self libary for CRUD proccess for SAVE!
*/

export const Note_save: any = async (userid: number, value: any) => 
{
    
    
    let  GetResult: any | undefined = null;
    let lastInsertID: number  = 0;

    return new Promise((resolve, reject) => 
    {

        // Upload titlte to DB
        utils.posgres_client.query(`INSERT INTO N_Title(_Title) VALUES($1) returning id;`, [value[0]], (error: Error, result: Object[]) => 
        {
            if (error) throw error; // if there is/are error
            
            if (result != undefined) 
            { //!
                GetResult = result
                lastInsertID = GetResult["rows"][0].id
                

                    // Upload url to DB
                    utils.posgres_client.query(`INSERT INTO N_Url(_UrlN) VALUES($1) returning id;`, [value[1]], (error: Error, result: Object[]) => 
                    { //!
                        if (error) throw error; // if there is/are error
                
                        if (result != undefined) 
                            { 
                                GetResult = result
                                lastInsertID = GetResult["rows"][0].id
                                // Upload file name to DB
                                utils.posgres_client.query(`INSERT INTO N_File(_FileN) VALUES($1) returning id; `, [value[2]], (error: Error, result: Object[]) => 
                                    {
                                        if (error) throw error; // if there is/are error
                                        
                                        if (result != undefined) 
                                        { 
                                            GetResult = result
                                            lastInsertID = GetResult["rows"][0].id
                                            /// Maybe false argument in query where below
                                            utils.posgres_client.query(`INSERT INTO _Notes(_UserID, _TitleID, _UrlID, _FileNID) VALUES($1, $2, $3, $4);`, [userid, lastInsertID, lastInsertID, lastInsertID], async (error: Error, result: Object[]) => 
                                                {//!
                                                    if (error) throw error; // if there is/are error

                                                    // Has been save all informations of info
                                                    console.log("Has been save all informations of info (user id, title, url, file)");
                                                    if (result != undefined) resolve(true); else reject(false); 
                                                }//!
                                        )}
                                        else reject(false);
                                    }
                            )}
                            else reject(false);
                    }//!
            )}//!
            else reject(false);
        }
    )}

)}




export const Note_delete: any = async (noteid: number, deleter: number) => 
{

    // Main proccess completed
    return new Promise ((resolve, reject) => 
    {
        //! check presence of note in midware for security
        
        utils.posgres_client.query(`DELETE FROM _notes WHERE id = $1;`, [noteid])
            .then((result: any) => 
            {
                if (result["rowCount"] == 1) resolve(true); else reject(false);
            })  
            .catch((error: any) => console.error(error))
    }
    /*
        Save to _Deleted database these data with deleter id
    */
)}



export const Note_accept: any = async (accepter: string, noteid: number) => 
{ 
    // Main proccess completed
    //! check presence of note in midware

    return new Promise((resolve, reject) => 
    {
        utils.posgres_client.query(`INSERT INTO public.n_acceptednotes(_accepterid, _noteid) VALUES($1, $2);`, [accepter, noteid], (error: Error, result: any) => 
        {
            if (error) throw error; // if there is/are error

            if (result["rowCount"] == 1) // Validated. Update status 
            {
                utils.posgres_client.query(`UPDATE public._notes SET _validStatus = 1 WHERE id IN (SELECT id FROM _notes where id = $1);`, [noteid])
                    .then((result: any) => 
                    {
                        if (result["rowCount"] == 1) resolve(true); else reject(false);
                    })
                    .catch((error: Error) => console.error(error))
            }

            else reject(false);
        })

    
    })
}


// wait 
export const Note_like: any = async (userid: number, noteid: number) => 
{
    //! check presence of note in midware

    return new Promise((resolve, reject) => 
    {
        utils.posgres_client.query(`INSERT INTO n_like(_userid, _noteid, _liken) VALUES($1, $2, $3);`, [userid, noteid, 1])
            .then((result: any) => 
            {
                if (result["rowCount"] == 1) resolve(true); else reject(false);
            })
            .catch((error: Error) => console.error(error))
    })

}



export const Note_comment: any = async (userid: number, noteid: number, comment: string) => 
{
    // main proccess completed 
    //! check presence of note in midware
    
    return new Promise((resolve, reject) => 
    {
        utils.posgres_client.query(`INSERT INTO n_comment(_userid, _noteid, _comment) VALUES($1, $2, $3);`, [userid, noteid, comment]) 
            .then((result: any) => 
            {
                if (result["rowCount"] == 1) resolve(true); else reject(false);
            })
            .catch((error: Error) => console.error(error))

    })
}