const   express                 = require("express"),
        passport                = require("passport"),
        mongoose                = require("mongoose"),
        bcrypt                  = require("bcryptjs"),
        productController       = require("../controller/product"),
        Product                 = require("../models/products"),
        crypto                  = require("crypto"),
        path                    = require("path"),
        multer                  = require("multer"),
        GridFsStorage           = require("multer-gridfs-storage"),
        Grid                    = require("gridfs-stream"),
        adminRegistration       = require("../controller/adminRegistration");

const router = express.Router();
require("dotenv").config();

//CONFIG
//GRIDFS File db connection
const URI = process.env.MONGOOSE;
const conn = mongoose.createConnection(URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

//GRIDFS CONFIG FOR IMAGES
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("files");
});

//GRIDFS STORAGE CONFIG
const storage = new GridFsStorage({
    url: URI,
    options : {useUnifiedTopology : true},
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: "files"
            };
            resolve(fileInfo);
            });
        });
    }
});

//Multer config for images
const files = multer({ storage });

//Uploading multiple departmental files
const cpUpload = files.fields([{ name: 'front', maxCount: 1 }, { name: 'back', maxCount: 1 }, {name: "left", maxCount : 1}, {name: "right", maxCount : 1}, {name: "inside", maxCount : 1}]);

//Login checker
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/admin/login");
    }
};

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
router.post("/register", adminRegistration.registration);

// LOGIN FORM
router.get("/login", (req, res) => {
    res.render("admin/login", {title : "SL Shop Admin Login Page"});
});

// LOGIN LOGIC
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect : "/admin",
        failureRedirect : "/admin/login"
    })(req, res, next);
});

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/admin/login");
});

// PRODUCTS ROUTE
router.get("/products", isLoggedIn, (req, res) => {
    Product.find({})
    .then(products => {
        if(products){
            res.render("admin/products", {title : "Products Page", products: products});
        }
    })
    .catch(err => {
        if(err){
            console.log(err);
            res.redirect("back");
        }
    });
});

// ADD PRODUCT FORM PAGE
router.get("/products/add", isLoggedIn, (req, res) => {
    res.render("admin/addProduct", {title : "Adding pro"});
});

// ADD PRODUCT FORM LOGIC
router.post("/products/add", cpUpload, (req, res) => {
    Product.create({
        name : req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        quantity: req.body.quantity,
        creator: req.user._id,
        category: req.body.category,
        front: req.files["front"][0].filename,
        back: req.files["back"][0].filename,
        left: req.files["left"][0].filename,
        right: req.files["right"][0].filename,
        inside: req.files["inside"][0].filename
    })
    .then(program => {
        if(program){
            // req.flash("error", "DEPARTMENT EXISTS");
            console.log("PRODUCT ADDED SUCCESSFULLY");
            res.redirect("/admin/products/add");
        }
    })
    .catch(err => {
        if(err){
            console.log(err);
            res.redirect("/admin/products/add");
        }
    });
});

// VIEW SINGLE PRODUCT
router.get("/products/:id", (req, res) => {
    res.send("<h1>WELCOME TO THE PRODUCTS SINGLE PAGE ROUTE</h1>");
});

// UPDATE PRODUCT GET ROUTE
router.get("/products/:id/edit", (req, res) => {
    res.send("<h1>WELCOME TO THE GET SINGLE PRODUCT EDIT ROUTE</h1>");
});

// UPDATE PRODUCT PUT ROUTE
router.put("/products/:id/edit", (req, res) => {
    res.send("<h1>WELCOME TO THE SINGLE PRODUCT UPDATE ROUTE</h1>");
});

// DELETE PRODUCT
router.delete("/products/:id", (req, res) => {
    res.send("<h1>WELCOME TO THE DELETE ROUTE</h1>");
});

//Getting the files
router.get("/files/:filename", (req, res) => {
    gfs.files.findOne({filename : req.params.filename}, (err, foundFiles) => {
        if(foundFiles){
            const readstream = gfs.createReadStream(foundFiles.filename);
            readstream.pipe(res);
        }else{
            console.log(err);
        }
    });
})

module.exports = router;
