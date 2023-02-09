const { User, Profile, Post, Tag, PostTag } = require("../models")

class Controller {
    ////REGISTER///
    static register(req, res) {
        res.render("registerForm")
    }
    static saveRegister(req, res) {
        const { username, email, password, role } = req.body
        User.create({ username, email, password, role })
            .then((newUser) => {
                res.redirect("/login")
            })
            .catch(err => res.send(err))

    }
    //// LOGIN //////////
    static loginForm(req, res) {
        res.render("login")
    }
    static saveLogin(req, res) {
        res.send("login save")
    }

    //// HOME ///////
    static home(req, res) {
        res.render("home")
    }


    ////////////LOG OUT/////////
    static getLogout(res, req) {
        res.send("logout")
    }




}

module.exports = Controller;