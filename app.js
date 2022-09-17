const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");

const hostname = "localhost";
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session(
    {secret: "redPanda", 
    cookie: {maxAge: 60000}
})
);

app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "/login.html"));
})

app.get("/main", (req, res) => {
    if(req.cookies.username) {
        res.send(`Hei og velkommen ${req.cookies.username}`);
    } else {
        res.sendFile(path.join(__dirname, "/login.html"));
    }
})


app.post("/authenticate-user", (req, res) => {
    if (req.body.username == "morten" && req.body.password == "password") {
        res.cookie("username", req.body.username);
        res.redirect("/main")
    } else {
        console.log("wrong username or password");
    }
})
app.listen(port, () => {
    console.log(`You are on ${hostname} on port: ${port}`);
});