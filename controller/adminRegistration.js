const   User                = require("../models/user"),
        bcrypt              = require("bcryptjs");

exports.registration = ((req, res) => {
    if(req.body.password === req.body.rePassword){
        bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
            .then(hash => {
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                })
                .then(user => {
                    if(user){
                        res.redirect("/admin/login");
                    }
                })
                .catch(err => {
                    if(err){
                        console.log(err);
                    }
                });
            })
        })
    }
})