const mongoose = require('mongoose')

const BrokenSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: [true, 'Please add the SteamID of the mod'],
        max: [12, 'ID not formatted properly!']
    },
    title:{
        type: String,
        required: [true, 'Please add a title of the mod'],
        max: [50, 'Title cannot be more than 50 characters']
    },
    url: {
        type: String,
        default: 'Removed'
    },
    issue: {
        type: String,
        required: [true, 'Please add a short description what is wrong with the mod'],
        max: [50, 'Description cannot be more than 50 characters']
    },
    replacements: [
        {
            _id: false,
            replacementTitle: String,
            replacementUrl: String
        }
    ]
})

module.exports = mongoose.model('Broken', BrokenSchema);
