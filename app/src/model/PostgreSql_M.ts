import * as utils from '../utils/utils';

class Note {
    init = async () => {
        const Note_infos: any = utils.posgres_client.query(`
            
        CREATE TABLE IF NOT EXISTS _Notes(
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserId INT NOT NULL, 
                _Title VARCHAR(2048) NOT NULL,
                _Url VARCHAR(2048) DEFAULT null,
                _File VARCHAR(80) NOT NULL 
                
            ) 
        `)
    }
}


export = new Note;
