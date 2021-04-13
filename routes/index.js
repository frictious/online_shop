const   express             = require("express");

const router = express.Router();

//Home
router.get("/", (req, res) => {
    res.render("index", {title : "Online Shop Homepage"});
});

// About
router.get("/about", (req, res) => {
    res.render("about", {title : "About Online Shop"});
});

// Contact
router.get("/contact", (req, res) => {
    res.render("contact", {title : "Contact Online Shop"});
});

// Product
router.get("/product", (req, res) => {
    res.render("product", {title : "Online Shop Product Page"});
});

module.exports = router;
