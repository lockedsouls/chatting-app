const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sent_at: {
        type:{
            date: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        },
        require: true
    }
});

module.exports = mongoose.model("Logs", logSchema, "Logs");