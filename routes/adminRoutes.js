// routes/adminRoutes.js
const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();
const passport = require("passport");

router.get("/", adminController.getAdminLogin);
router.post("/admin-login", passport.authenticate("admin-local", {
    successRedirect: "admin-dashboard",
    failureRedirect: "admin-error",
}));
router.get("/admin-dashboard", adminController.getAdminDashboard);
router.post("/admin-dashboard/add-book", adminController.postAddBook);
router.get("/admin-error", adminController.getAdminError);

module.exports = router;
