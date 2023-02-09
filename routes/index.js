const express = require("express");
const router = express.Router();
const Controller = require(`../controllers`);

// REGISTER//
router.get("/register", Controller.register)
router.post("/register/add", Controller.saveRegister)

//LOGIN
router.get("/login", Controller.loginForm)

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

//LOGOUT
router.get("/logout", Controller.getLogout)



module.exports = router;