const   mongoose            = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    review: String,
    created: {
        type: Date,
        default: Date.now
    },
    productReviewed: String
});

module.exports = mongoose.model("Review", reviewSchema);