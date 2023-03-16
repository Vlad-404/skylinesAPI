const mongoose = require('mongoose')

const BrokenSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: [true, 'Please add the SteamID of the mod'],
        maxLength: [10, 'ID cannot be more than 10 characters']
    },
    title:{
        type: String,
        required: [true, 'Please add a title of the mod'],
        maxLength: [50, 'Title cannot be more than 50 characters']
    },
    url: {
        type: String,
        required: [true, 'Please add a URL of the mod'],
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
          ]
    },
    issue: {
        type: String,
        required: [true, 'Please add a short description what is wrong with the mod'],
        maxLength: [50, 'Description cannot be more than 50 characters']
    },
    replacementTitle: {
        type: String,
        maxLength: [50, 'Title cannot be more than 50 characters']
    },
    replacementUrl: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
          ]
    }
})

module.exports = mongoose.model('Broken', BrokenSchema);
