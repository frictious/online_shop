const { Router } = require("express");
const   express             = require("express");

const router = express.Router();

//CONFIG

//ROUTES
router.get("/", (req, res) => {
    res.render("admin/index", {title : "Admin Homepage"});
    // res.send("<h1>WELCOME TO THE ADMIN PAGE</h1>");
});

//REGISTRATION FORM ROUTE
router.get("/register", (req, res) => {
    res.render("admin/register", {title : "Admin Registration"});
});

// REGISTRATION LOGIC
router.post("/register", (req, res) => {
    res.send("<h1>ADMIN REGISTRATION ROUTE</h1>");
});

// LOGIN FORM ROUTE
router.get("/login", (req, res) => {
    res.render("admin/login", {title : "Admin Login Page"});
});

// PRODUCTS ROUTE
router.get("/products", (req, res) => {
    res.render("admin/products", {title : "Products Page"});
});

// ADD PRODUCT

// VIEW SINGLE PRODUCT

// UPDATE PRODUCT

// DELETE PRODUCT

// LOGIN LOGIC

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/admin/login");
});

module.exports = router;
