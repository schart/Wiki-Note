import mongoose from 'mongoose';

const Schema: any = mongoose.Schema

const UserSchema = new Schema({

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

    _PpName: {
        type: String,
        unique: true,
        require: true
    },

    _Password: {
        type: String,
        require: true
    },

    _Admin: {
        type: Boolean,
        require: true,
        default: 0,
    }
})

export const Users: any = mongoose.model('Users', UserSchema)


