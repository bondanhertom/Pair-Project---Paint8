const { User, Profile, Post, Tag, PostTag } = require("../models")
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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
        const { error } = req.query
        res.render("login", { error })
    }
    static saveLogin(req, res) {
        const { username, password } = req.body

        User.findOne({ where: { username } })
            .then((user) => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password);//true false
                    console.log(isValidPassword);
                    if (isValidPassword) {
                        //berhasil login
                        req.session.UserId = user.id //set session di controller login, ngecek seesion di midlewere root
                        return res.redirect("/");
                        //res.send(user)
                    } else {
                        //ketika gagal login password tidak sama
                        const error = "Invalid Username/Password"
                        return res.redirect(`/login?error=${error}`)
                    }
                }
            })
            .catch((err) => res.send(err))

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