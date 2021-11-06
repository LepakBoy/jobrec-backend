require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const routerNavigation = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(xss());
app.use(helmet(helmet()));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public")); //localhost:3001/uploads/movie/nama file gambar

app.use("/", routerNavigation);

app.listen(port, () => {
  console.log(`express app is listen on port ${port}`);
});
