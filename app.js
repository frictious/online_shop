const   express             = require("express"),
        Index               = require("./routes/index"),
        Admin               = require("./routes/admin"),
        mongoose            = require("mongoose"),
        session             = require("express-session"),
        passport            = require("passport"),
        bodyParser          = require("body-parser"),
        methodOverride      = require("method-override"),
        flash               = require("connect-flash");

const app = express();
require("dotenv").config();
require("./login/login")(passport);

//CONFIG
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

global.Promise = mongoose.Promise
mongoose.connect(process.env.MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser : true
});

//Express session configuration
app.use(session({
    secret : "SL Shop",
    resave : false,
    saveUninitialized : false
}));

app.use(bodyParser.urlencoded({extended: true}));// Bodyparser configuration
app.use(flash());//Using connect flash

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use(express.static("public"));
app.use("/", Index);
app.use("/admin", Admin);


app.listen(process.env.PORT, () => {
    console.log(`Server Started on PORT ${process.env.PORT}`);
});
