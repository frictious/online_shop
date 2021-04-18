const   mongoose            = require("mongoose"),
        Review              = require("./reviews");

const productSchema         = new mongoose.Schema({
    name : String,
    description: String,
    cost: String,
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    quantity: Number,
    visibility: {
        type: Number,
        default: 0
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Products", productSchema);