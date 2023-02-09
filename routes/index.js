const express = require("express");
const router = express.Router();
const Controller = require(`../controllers`);

// REGISTER//
router.get("/register",Controller.register)
router.post("/register/add",Controller.saveRegister)

//HOME
router.get("/",Controller.home)

//LOGIN
router.get("/login",Controller.loginForm)
router.post("/login",Controller.saveLogin)

//LOGOUT
router.get("/logout",Controller.getLogout)



module.exports = router;