const mongoose = require("mongoose")

/*
USER SCHEMA
*/
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

/*
ARTICLE SCHEMA
*/
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

/*
COMMENT SCHEMA
*/
const commentSchema = new mongoose.Schema({

    nombre: {
        type: String, 
        required: true
    },

    contenido: {
        type: String,
        required: true
    },
    
    articuloId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Article",  
        required: true, 
    }
})

const Comment = mongoose.model("comment", commentSchema)

module.exports = {User, Article, Comment}