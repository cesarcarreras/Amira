const {Schema, model} = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    email: String,
    name: String,
    birthday: Date,
    img: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'UNCONFIRMED'],
        default: 'UNCONFIRMED'
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    googleId: String
}, {timestamps:true, versionKey: false})

userSchema.plugin(PLM, {usernameField: 'email'});

module.exports = model('User', userSchema);