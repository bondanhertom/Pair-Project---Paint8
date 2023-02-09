const express = require('express')
const app = express()
const port = 3000
const router = require("./routes")
const session = require("express-session");

app.use(
  session({
    secret: "rahasia developer",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true, // For security dari csrf attack
    },
  })
);
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))

app.use(router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})