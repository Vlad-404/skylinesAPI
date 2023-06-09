const mongoose = require('mongoose');

const User = require('./User');

const BrokenSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: [true, 'Please add the SteamID of the mod']
    },
    title:{
        type: String,
        required: [true, 'Please add a title of the mod'],
        maxLength: [50, 'Title cannot be more than 50 characters']
    },
    url: {
        type: String,
        default: 'Removed from workshop'
    },
    issue: {
        type: String,
        required: [true, 'Please add a short description what is wrong with the mod'],
        maxLength: [50, 'Description cannot be more than 50 characters']
    },
    replacements:[
        {
            _id: false,
            replacementTitle: String,
            replacementUrl: String
        }
    ],
    addedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    firstAddedOn: {
        type: Date,
        default: Date.now
    },
    lastEditBy: String,
    lastEditDate: Date
});

module.exports = mongoose.model('Broken', BrokenSchema);
