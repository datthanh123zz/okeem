const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
const connectDB = require('./config/config')
const path = require('path');


// Kết nối MongoDB
connectDB();
// Thiết lập ứng dụng
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); // Định nghĩa đường dẫn tới thư mục views
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: "Rio is a dog",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport cấu hình
passport.use("admin-local", new LocalStrategy(function (username, password, done) {
    if (username === "Admin" && password === "12345") {
        return done(null, { username: "Aptech" });
    }
    return done(null, false, { message: "Incorrect admin username or password" });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Đăng ký router
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server Has Started!");
});
