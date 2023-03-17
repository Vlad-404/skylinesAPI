const mongoose = require('mongoose')

const BrokenSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: [true, 'Please add the SteamID of the mod'],
        maxLength: [12, 'ID cannot be more than 12 characters']
    },
    title:{
        type: String,
        required: [true, 'Please add a title of the mod'],
        maxLength: [50, 'Title cannot be more than 50 characters']
    },
    url: {
        type: String,
        default: 'Removed'
    },
    issue: {
        type: String,
        required: [true, 'Please add a short description what is wrong with the mod'],
        maxLength: [50, 'Description cannot be more than 50 characters']
    },
    replacements: [
        {
            _id: Number,
            replacementTitle: String,
            replacementUrl: String
        }
    ]
})

module.exports = mongoose.model('Broken', BrokenSchema);
