const {Schema, model} = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    purchases: String,
    birthday: Date,
    img: {
        type: String,
        default: "https://res.cloudinary.com/wbnkfjbkjf/image/upload/v1630041033/Chip/user_ltpqid.png"
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    googleId: String
}, {timestamps:true, versionKey: false})

userSchema.plugin(PLM, {usernameField: 'email'});

module.exports = model('User', userSchema);