const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    googleId: {
        type: String, 
        required: true
    },
    
    displayName: {
        type: String, 
        required: true
    },

    image: {
        type: String, 
        required: true
    },

    createdAt: {
        type: Date, 
        default: Date.now()
    }
})

const User = mongoose.model("user", userSchema);

const articleSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },

    imagen: {
        type: String,
        required: true
    },

    contenido: {
        type: String,
        required: true
    },

    autor: {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',  
        required: true
    },

    createdAt: {
        type: Date, 
        default: Date.now()
    }
})

const Article = mongoose.model("article", articleSchema);

module.exports = {User, Article}