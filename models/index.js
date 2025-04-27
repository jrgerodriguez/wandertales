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

module.exports = {User}