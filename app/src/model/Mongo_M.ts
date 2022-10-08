import mongoose from 'mongoose';

const Schema: any = mongoose.Schema

const usersSchema: any = new Schema({

    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const Users: any = mongoose.model('Users', usersSchema)



export = Users;
