import * as utils from '../utils/utils';

export class DB 
{

    delete_all_table = () =>
    {
        utils.posgres_client.query
        (`
            -- Recreate the schema
            DROP SCHEMA public CASCADE;
            CREATE SCHEMA public;

            -- Restore default permissions
            GRANT ALL ON SCHEMA public TO postgres;
            GRANT ALL ON SCHEMA public TO public;
        `)
    }


    init_note = () => 
    {
        // FileN -> File name     

        const Note_info: string = utils.posgres_client.query
        (` 
            CREATE TABLE IF NOT EXISTS _Notes
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserId varchar(100) NOT NULL, 
                _TitleId INT NOT NULL,
                _UrlId INT NOT NULL,
                _FileNId INT NOT NULL,
                _ValIdStatus BOOLEAN NOT NULL DEFAULT FALSE -- this is a only to be able boolean value
            ) 
        `)

        const Note_title: string = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Title
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _Title VARCHAR(50) NOT NULL
            );
            
        `) 

        const Note_url: string = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Url
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UrlN VARCHAR(2048) DEFAULT NULL
            );   
        `)

        const Note_file: string = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_File
            (    
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _FileN VARCHAR(50) NOT NULL 
            );
        `)
        
        const Note_comment: string = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Comment
            (    
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserId VARCHAR(100) NOT NULL,
                _NoteId INT NOT NULL,
                _Comment VARCHAR(500) NOT NULL
            );
        `)
        const Note_like: string = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Like
            (    
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserId VARCHAR(80) NOT NULL,
                _NoteId INT NOT NULL, 
                _LikeN BOOLEAN NOT NULL 
            );
        `)
    }

    init_follow =  () => 
    {
    
        const Follow: string = utils.posgres_client.query
            (`
                CREATE TABLE IF NOT EXISTS U_follow
                (
                    Id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                    _FollowerId VARCHAR(80) NOT NULL,
                    _FollowedId VARCHAR(80) NOT NULL, 
                    _Status BOOLEAN NOT NULL DEFAULT FALSE -- If status equal to 1, that get meaning follow.
                )    
            
            `)
    } 

    init_notification =  () => 
    {
        const Notification: string = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS U_notification
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _NotificatorId VARCHAR(80) NOT NULL, -- Notificator get mean: who is dId shared notification
                _ForWhoseId VARCHAR(80) NOT NULL, -- 0 for everyone, Id for a user
                _Message VARCHAR(80) NOT NULL 
                --_Status BOOLEAN NOT NULL DEFAULT FALSE -- if was read notification, that variable with name "status" equal to true
            )
        `)

    }

    init_readAtLater = () => 
    {
        const ReadAtLater: string = utils.posgres_client.query
        (`
        
        CREATE TABLE IF NOT EXISTS U_readAtLater
        (
            Id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            _UserId VARCHAR(80) NOT NULL,  
            _NoteId INT NOT NULL,
            _Status BOOLEAN NOT NULL DEFAULT TRUE 
        )
        
        `)

    }

}


/*
// Doesn't create table except "DNotes"
export class Deleted_Notes 
{
    init = async () => {
        
        // We created "_NoteDeleted" db for keep data of deleted posts
        const DNotes: any = utils.posgres_client.query
        (`
            
            CREATE TABLE IF NOT EXISTS _DNotes
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _UserId varchar(80) NOT NULL, 
                _DeleterId INT NOT NULL,
                _TitleId VARCHAR(50) NOT NULL,
                _UrlId VARCHAR(2048) DEFAULT null,
                _FileNId VARCHAR(50) NOT NULL 
            )
        `)


        const DNote_title: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS D_Title
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _Title VARCHAR(50) NOT NULL
            );
            
        `) 

        const DNote_url: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS D_Url
            (
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _Url VARCHAR(2048) DEFAULT null
            );   
        `)

        const DNote_file: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS D_File
            (    
                Id INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _FileN VARCHAR(50) NOT NULL 
            );
        `)
    }
} 
*/