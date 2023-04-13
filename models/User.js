const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add your user name'],
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add your email address'],
        maxLength: [50, 'Email cannot be more than 50 characters'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    role: {
        type: String,
        enum: ['user', 'moderator'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        maxLength: [50, 'Password cannot be more than 50 characters'],
        minLength: [6, 'Please use password longer than 6 characters'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);