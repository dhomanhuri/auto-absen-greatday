require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const axios = require("axios");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const cron = require("node-cron");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/apinya", usersRouter);

cron.schedule("* * * * *", async function () {
    console.log("Running task every 00");
    try {
        await axios.get("http://localhost:3310/apinya/absen");
    } catch (error) {
        console.log(error);
    }
});

module.exports = app;
