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
        Give Perrmission ( can admin only ),  



Routers:
        Login & Register:

                Test Register:
                        "user/register": Register user (register)  =>  SUCCESS.

                        Requierements: 
                                User name(for display to other user), Email(for security), Password(your secret pass).
                
                Test Login: 

                        "user/login": Login user (login) => SUCCESS.
                        "user/logout": Login user (logout) => SUCCESS.
                        
                        Requierements: 
                                Email(Format: G-mail), password(min: 8 characters).
        
        Note & Its process:
                Test Note:
                        "note/upload": Note upload (upload) => SUCCESS.
                        "note/delete": Note delete (delete) => SUCCESS.
                        "note/like": Note like (like) => SUCCESS.
                        "note/accept": Note accept (accept) => SUCCESS.
                        "note/comment": Note comment (comment) => SUCCESS.
                
                        Requierements:
                                Upload Note => Optional(where you take-ed this note: URL), Title(title of subject), File(FileType: PDF or TXT).
                                Delete Note => Note of Id.
                                Like Note => Note of Id.
                                Accept Note => Note of Id.
                                Comment Note => only content as text.  
       
        User & Its process: 
                Test User:
                        "user/follow": user follow/unfollow (follow/unfollow) => SUCCESS.
                        "user/photo-update": User set photo (photo) => SUCCESS.
                        "user/add-rat/noteId": Add a note to read at later (add) => SUCCESS.

                        Requierements: 
                                Follow, Unfollow => (follower and followed id).
                                Change Photo => Only new a photo.
                                Add to RAT => Only Id of note. (BTW Id comes as auto).

        Admin process:
                Test Admin:
                        "admin/notification": admin send notification (Id and Message) => SUCCESS.
                        "admin/report-note": admin report note (Reporter Id and Note Id) => SUCCESS.


                Requierements: 
                        Send notification => (notificatorId, forwhoseId, Message).

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
        And only Ompiyotent/Owner can give this permission to you!