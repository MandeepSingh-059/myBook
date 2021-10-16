const express = require("express")
const User = require("../models/User")
const router = express.Router()

//without router we would do app.get(req, res) here req is request and res is response
//Create a user using: POST "/api/auth/". Dosent require Authentication
router.post("/", (req, res) => {
    console.log(req.body)//req ko read kia
    res.send(req.body)//res send krr dia

    const user = User(req.body)
    user.save()

})

module.exports = router