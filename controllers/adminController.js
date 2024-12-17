// controllers/adminController.js
const Book = require("../model/Book");

exports.getAdminLogin = (req, res) => {
    res.render("admin-login");
};

exports.getAdminDashboard = (req, res) => {
    if (req.isAuthenticated()) {
        res.render("admin-dashboard");
    } else {
        res.redirect("/admin");
    }
};

exports.postAddBook = (req, res) => {
    if (req.isAuthenticated()) {
        const bookDetails = {
            Book_id: req.body.Book_id,
            Book_name: req.body.Book_name,
            Author_name: req.body.Author_name,
            Price: req.body.Price,
            Age_group: req.body.Age_group,
            Book_type: req.body.Book_type,
        };
        Book.create(bookDetails)
            .then(() => res.redirect("/admin-dashboard"))
            .catch(() => res.render("error", { errorMessage: "Failed to add book" }));
    } else {
        res.redirect("/admin");
    }
};

exports.getAdminError = (req, res) => {
    res.render("admin-error", { errorMessage: "Incorrect admin username or password" });
};
