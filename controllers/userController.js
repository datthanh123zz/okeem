// controllers/userController.js
const User = require("../model/User");
const Book = require("../model/Book");

exports.getHome = (req, res) => {
    res.render("home");
};

exports.getRegister = (req, res) => {
    res.render("register");
};

exports.postRegister = async (req, res) => {
    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.redirect("/");
    } catch (error) {
        res.render("error", { errorMessage: "Failed to register user." });
    }
};

exports.getLogin = (req, res) => {
    res.render("login");
};

exports.postLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = req.body.password === user.password;
            if (result) {
                const books = await Book.find({});
                res.render("booklist", { books: books });
            } else {
                res.render("error", { errorMessage: "Password doesn't match" });
            }
        } else {
            res.render("error", { errorMessage: "User doesn't exist" });
        }
    } catch (error) {
        res.render("error", { errorMessage: "An error occurred" });
    }
};

exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect("/");
    });
};
