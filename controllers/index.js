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
                    if (isValidPassword) {
                        //berhasil login
                        req.session.UserId = user.id //set session di controller login, ngecek seesion di midlewere root
                        req.session.role = user.role;
                        return res.redirect("/");
                    } else {
                        //ketika gagal login password tidak sama
                        const error = "Invalid Username/Password"
                        return res.redirect(`/login?error=${error}`)
                    }
                }
            })
            .catch((err) => res.send(err))

    }

    ////////////LOG OUT/////////
    static getLogout(req, res) {
        res.send("logout")
    }

    //// HOME ///////
    static home(req, res) {
        const { error } = req.query
        res.render("home", { error })

    }
    static addPostingan(req, res) {
        const id = req.params.id;
        const { error } = req.query;
        User.findByPk(id)
            .then((users) => {
                res.render("addPostingan", { users, error });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static saveAddPosting(req, res) {
        const { title, caption, imageUrl } = req.body;
        const id = req.session.UserId;
        Post.create({ title, caption, imageUrl, UserId: id })
            .then(() => {
                res.redirect("/");
            })
            .catch((err) => {
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map((el) => {
                        return el.message;
                    });
                    res.send(errors);
                }
            });
    }



}


module.exports = Controller;