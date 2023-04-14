const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add your user name'],
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add your email address'],
        max: [50, 'Email cannot be more than 50 characters'],
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
        max: [50, 'Password cannot be more than 50 characters'],
        min: [6, 'Please use password longer than 6 characters'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcryptjs
// Code from bcrypt website(https://www.npmjs.com/package/bcrypt#user-content-to-hash-a-password-1)
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt);
})

// Sign JWT and return
// More on: https://github.com/auth0/node-jsonwebtoken
// Method is used on the currently logged in user
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

module.exports = mongoose.model('User', UserSchema);
