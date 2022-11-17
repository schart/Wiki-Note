import * as utils from '../utils/utils';

export class Note 
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


    init = () => 
    {
        // FileN -> File name     

        const Note_info: any = utils.posgres_client.query
        (` 
            CREATE TABLE IF NOT EXISTS _Notes
            (
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserID varchar(80) NOT NULL, 
                _TitleID INT NOT NULL,
                _UrlID INT NOT NULL,
                _FileNID INT NOT NULL,
                _ValidStatus INT NOT NULL DEFAULT 0 -- this is a only to be able boolean value
            ) 
        `)

        const Note_title: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Title
            (
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _Title VARCHAR(50) NOT NULL
            );
            
        `) 

        const Note_url: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Url
            (
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UrlN VARCHAR(2048) DEFAULT null
            );   
        `)

        const Note_file: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_File
            (    
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _FileN VARCHAR(50) NOT NULL 
            );
        `)
        
        const Note_comment: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Comment
            (    
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserId VARCHAR(50) NOT NULL,
                _NoteId INT NOT NULL,
                _Comment VARCHAR(500) NOT NULL
            );
        `)
        const Note_like: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_Like
            (    
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _UserId VARCHAR(50) NOT NULL,
                _NoteID INT NOT NULL, 
                _LikeN BOOLEAN NOT NULL 
            );
        `)

        const Note_accept_status: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS N_acceptedNotes
            (    
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _AccepterID VARCHAR(80) NOT NULL, -- admin id
                _NoteID INT NOT NULL
                -- _StatusN BOOLEAN NOT NULL 
            );
        `)
    }
}

// Doesn't create table except "DNotes"
export class Deleted_Notes 
{
    init = async () => {
        
        // We created "_NoteDeleted" db for keep data of deleted posts
        const DNotes: any = utils.posgres_client.query
        (`
            
            CREATE TABLE IF NOT EXISTS _DNotes
            (
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _UserID varchar(80) NOT NULL, 
                _DeleterID INT NOT NULL,
                _TitleID VARCHAR(50) NOT NULL,
                _UrlID VARCHAR(2048) DEFAULT null,
                _FileNID VARCHAR(50) NOT NULL 
            )
        `)


        const DNote_title: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS D_Title
            (
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                _Title VARCHAR(50) NOT NULL
            );
            
        `) 

        const DNote_url: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS D_Url
            (
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _Url VARCHAR(2048) DEFAULT null
            );   
        `)

        const DNote_file: any = utils.posgres_client.query
        (`
            CREATE TABLE IF NOT EXISTS D_File
            (    
                ID INT NOT NULL GENERATED ALWAYS AS IDENTITY  PRIMARY KEY,
                _FileN VARCHAR(50) NOT NULL 
            );
        `)
    }
} 
