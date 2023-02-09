const { User, Profile, Post, Tag, PostTag } = require("../models")

class Controller {
    ////REGISTER///
    static register(res, req) {
        res.render("registerForm")
    }
    static saveRegister(res, req) {
        const { username, email, password, role } = req.body
        User.create({ username, email, password, role })
            .then((newUser) => {
                res.redirect("/login")
            })
            .catch(err => res.send(err))

    }
    //// LOGIN //////////
    static loginForm(res, req) {
        res.render("/login")
    }
    static saveLogin(res, req) {
        res.send("login save")
    }

    //// HOME ///////
    static home(res, req) {
        res.render("home")
    }


    ////////////LOG OUT/////////
    static getLogout(res, req) {
        res.send("logout")
    }




}

module.exports = Controller;