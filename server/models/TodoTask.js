const mongoose = require('mongoose')

// MongoDB is noSQL, flexible, document
// ID is automatically created for you
const todoTaskSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true },
)
module.exports = mongoose.model('TodoTask', todoTaskSchema)
