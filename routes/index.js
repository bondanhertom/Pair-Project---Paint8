const express = require("express");
const router = express.Router();
const Controller = require(`../controllers`);

// REGISTER//
router.get("/register", Controller.register)
router.post("/register/add", Controller.saveRegister)

//LOGIN
router.get("/login", Controller.loginForm)

//LOGOUT
router.get("/logout", Controller.getLogout)

//SESSION MIDLEWARE///
router.post("/login", Controller.saveLogin)
router.use(function (req, res, next) {
    console.log(req.session);
    if (!req.session.UserId) {
        // console.log(req.session.user);
        const error = `Please Login First`;
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
});
//HOME
router.get("/", Controller.home)

// <<<<<<<<  ADD    >>>>>>>>>> //

// <<<<<<<<  ADD    >>>>>>>>>> //
router.use(function (req, res, next) {
    if (req.session.UserId && req.session.role !== "Creator") {
        const error = `You do not have permissions to access`;
        res.redirect(`/?error=${error}`);
    } else {
        next();
    }
});

// <<<<<<<<<   ADD   >>>>>>>>>> //

// POST UPLOAD
router.get("/upload", Controller.addPostingan);
router.post("/upload", Controller.saveAddPosting);

// // DESTROY // EDIT // LIKE
// router.get("/delete/:id", Controller.totalDislikes);
// router.get("/edit/:id", Controller.updatePost);
// router.post("/edit/:id", Controller.saveUpdate);
// router.get("/likes/:id", Controller.totalLikes);







module.exports = router;