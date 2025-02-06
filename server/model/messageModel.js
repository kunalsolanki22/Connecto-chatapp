const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true,
            },
        },
        users: {
            type: Array, // Expect an array with two user IDs
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manages 'createdAt' and 'updatedAt'
    }
);

module.exports = mongoose.model("Message", messageSchema);
