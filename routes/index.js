const   express             = require("express"),
        Product             = require("../models/products");

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
    Product.find({})
    .then(products => {
        if(products){
            res.render("product", {title : "Online Shop Product Page", products: products});
        }
    })
    .catch(err => {
        if(err){
            console.log(err);
            res.redirect("back");
        }
    });
});

// Single product details route
router.get("/product/:id", (req, res) => {
    Product.findById({_id : req.params.id})
    .then(product => {
        if(product){
            res.render("singleProduct", {title : `Online Shop ${product.name} Page`, product: product});
        }
    })
    .catch(err => {
        if(err){
            console.log(err);
            res.redirect("back");
        }
    });
});

module.exports = router;
