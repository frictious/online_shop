const   mongoose            = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: {
        required : true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("User", userSchema);