require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("./config/mongo-connection");
const Router = require("./routes");
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session')


app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(session({ secret: process.env.privateKey, resave: false, saveUninitialized: true, cookie: { secure: true } }));

app.use("/", Router);
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.listen(8000, () => {
    console.log("server abc chay cong 8000");
});