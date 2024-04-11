const express = require("express"); //include express in this app
const path = require("path"); //module to help with file paths
const dotenv = require("dotenv");

dotenv.config(); //load local environment variables from .env file
dotenv.config();
//import page routes
const pageRouter = require("./modules/pages/router");

const app = express(); //create an Express app
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug"); //set up app to use Pug as template engine

//SET UP A PATH FOR STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// Set up for easier form data parsing
app.use(express.urlencoded({extended : true}));
app.use(express.json());

//USE PAGE ROUTES FROM MODULE
app.use("/", pageRouter);
app.use("/detail",pageRouter);
app.use("/comment",pageRouter);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});