const   express             = require("express"),
        Product             = require("../models/products"),
        nodemailer          = require("nodemailer");

const router = express.Router();
require("dotenv").config();

// CONFIG
const transport = nodemailer.createTransport({
    service : "gmail",
    auth:{
        type: "login",
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

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

// Sending Emails
router.post("/contact", (req, res) => {
    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL,
        subject : req.body.subject,
        html: req.body.message
    }

    //Sending mail
    transport.sendMail(mailOptions, (err, mail) => {
        if(!err){
            //Send mail to customer after sending us a mail using the contact form
            const mailOptions = {
                from: "slshop637@gmail.com",
                to: req.body.email,
                subject : `Thanks for contacting us`,
                html: `<p>Dear <strong>${req.body.name}</strong>,</p>
                <p>Hope this day has been going on well for you.</p>
                <p>We want to thank you for reaching out to us.</p>
                <p>A support staff has been notified of your mail, and will get back to you shortly.</p>
                <p>Thank you for reaching out to us using our contact form.</p>
                <br><br>
                <p>Sincerely</p>
                <p>SL Shop Team</p>`
            }

            //Sending mail
            transport.sendMail(mailOptions, (err, mail) => {
                if(!err){
                    res.redirect("/contact");
                }else{
                    console.log(err);
                    res.redirect("back");
                }
            });
        }else{
            console.log(err);
            res.redirect("back");
        }
    });
})

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
