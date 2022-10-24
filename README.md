# Wiki-Note
This project is a project based on my love for knowledge.

Routers:
        Login & Register:

        Requierements:
                
                Register => User name(for display to other user), Email(for security), Password(your secret pass)

                Login => Email(Format: G-mail), password(min: 8 characters)

        Test Register:

                "register/register-user": Register user (save)  =>  SUCCESS
                
        Test Login: 

                "login/login-user": Login user (login) => SUCCESS
                "login/logout-user": Login user (logout) => SUCCESS


        Note:

        Create post => Optional(where you take-ed this note: URL), Title(title of subject), File(FileType: PDF or TXT)



About DataBase:

        We using two different database. while primary DB(Postgresql) for relation data secondary DB(MongoDB) for none relation data and there is Redis on Cache  
        
        Warn: I am do not use function of db code as async, because if you are using as async "create table function" does not wait "delete table function" and "delete table function"  will work with "create table" at same time, so our tables will comes to we as missing.

        We're will make functions for CRUD proccess  