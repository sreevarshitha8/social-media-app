const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

let users = [];
let posts = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);

    if (user) {
        return res.json({ message: "User already exists" });
    }

    users.push({ username, password });

    res.json({ message: "Registration Successful" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        u => u.username === username &&
        u.password === password
    );

    if (user) {
        res.json({ message: "Login Successful" });
    } else {
        res.json({ message: "Invalid Username or Password" });
    }
});

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.post("/addPost", (req, res) => {
    posts.push({
        text: req.body.text,
        likes: 0,
        comments: []
    });

    res.json({
        message: "Post Added"
    });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});