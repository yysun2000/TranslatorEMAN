const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const route = require("./route.js")

app.use("/",route);
//app.use(express.bodyParser());
app.use(bodyParser())
app.use(express.static("./public"));
module.exports = app;
