const   express             = require("express"),
        Index               = require("./routes/index"),
        Admin               = require("./routes/admin");

require("dotenv").config();
const app = express();

//CONFIG
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", Index);
app.use("/admin", Admin);


app.listen(process.env.PORT, () => {
    console.log(`Server Started on PORT ${process.env.PORT}`);
});
