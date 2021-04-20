const   Product                 = require("../models/products"),
        mongoose                = require("mongoose"),
        crypto                  = require("crypto"),
        path                    = require("path"),
        multer                  = require("multer"),
        GridFsStorage           = require("multer-gridfs-storage"),
        Grid                    = require("gridfs-stream");

require("dotenv").config();
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

exports.addProduct = (req, res) => {
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
        }
    })
}