const { Schema, model } = require('mongoose')

const memeSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    meme: {
        type: String,
        default: null
    },
    likes:{
        type: Array
    },
    comments: {
        type: Array
    },
    color:{
        type: String
    },
    icon:{
        type: String
    }
}, { timestamps: true })


module.exports.Meme = model('Meme', memeSchema);
