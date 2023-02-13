# Wiki-Note
This project is a project based on my love for knowledge.

!: that get mean: this process completed in project
Contains: 
        Login!
        Register! 
        Upload Pdf!
        Comment!
        Profile photo! 
        Like!
        Follow!
        Unfollow!
        Read at late!
        Notification!
        Give Perrmission (can admin only)  


Routers:
        Login & Register:

                Test Register:
                        "user/register": Register user.

                        Requierements: 
                                POST Key-Format: email, username, password  
                
                Test Login: 

                        "user/login" : Login user.
                        "user/logout": Logout user.  
                        
                        Requierements: 
                                POST Key-Format: Email(Format: G-mail), password(min: 8 characters).
                                GET  Key-Format: username, password 
        
        Note & Its process:
                Test Note:
                        "note/upload"         : Note upload.
                        "note/delete"         : Note delete. 
                        "note/like"           : Note like.  
                        "note/accept/:noteId" : Note accept.  
                        "note/comment"        : Note comment  
                
                        Requierements:
                                POST  Upload Note  =>  Key-Format: file(pdf: named file), title, url
                                GET   Delete Note  =>  Key-Format: noteId
                                POST  Like Note    =>  Key-Format: noteId
                                GET   Accept Note  =>  Key-Format: noteId
                                POST  Comment Note =>  Key-Format: noteId, comment
       
                Test User:
                        "user/follow": user follow/unfollow. 
                        "user/photo-update": User set photo.    
                        "user/add-rat/:noteId": Add a note to read at later.

                        Requierements: 
                                POST Follow, Unfollow => Key-Format: followedId 
                                POST Change Photo     => Key-Format: photo(image type named: photo) 
                                GET  Add to RAT       => Key-Format: NoteId (But this argument may come as auto with button)

        Admin process:
                Test Admin:
                        "admin/notification"            :    admin send notification 
                        "admin/report-note"             :    admin report note   
                        "admin/give-permission/:userId" :    admin give permission 


                Requierements: 
                        POST Send notification => Key-Format: whoseId, message
                        POST Send report       => Key-Format: noteId 
                        GET Give permission    => Key-Format: userId 

About DataBase:

        We using two different database. while primary DB(Postgresql) for relation data secondary DB(MongoDB) for none relation data and there is Redis on Cache for quickly response.
        
        Warning: 
                I am do not use function of db code as async, because if you are using as async "create table function" does not wait "delete table function" and "delete table function" will work with "create table" at same time, so our tables will comes to we as missing.

        We are will make functions for CRUD process.  


About Read at later(RAT) box:
       
        If Status equal to FALSE, User wanna delete that Note from read at later box. 
        But we create stack of "I wanna delete notes" for deleted when server not busy.
        
        Then user wanna get the record of note in read at later box, we should get notes but if Status equal to "True" value. If equal to "FALSE", we must keep in stack for will delete.


About Notification: 
        
        If notification "ForWhose" value equal to 0 that notification get mean "for everyone", but "ForWhose" value if equal to "spesific a user id" get secret for this user.

Give permission: 

        This permission for manage Notifications, Notes, user etc.
        And only Omnipotent/Owner can give this permission to you!