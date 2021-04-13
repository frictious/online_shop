const   express             = require("express"),
        Index               = require("./routes/index");

require("dotenv").config();
const app = express();

//CONFIG
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/", Index);


app.listen(process.env.PORT, () => {
    console.log(`Server Started on PORT ${process.env.PORT}`);
});
