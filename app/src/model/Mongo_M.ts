import mongoose from 'mongoose';

const Schema: any = mongoose.Schema

const UserSchema: any = new Schema({

    _Username: {
        type: String,
        unique: true,
        require: true
    },

    _Email: {
        type: String,
        unique: true,
        require: true
    },

    _Password: {
        type: String,
        require: true
    }
})

const Users = mongoose.model('Users', UserSchema)



export = Users;
