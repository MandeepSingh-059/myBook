const express = require("express")
const User = require("../models/User")
const router = express.Router()
const { body, validationResult } = require('express-validator');

//without router we would do app.get(req, res) here req is request and res is response
//Create a user using: POST "/api/auth/". Dosent require Authentication

router.post("/", [
    body('name', "Minimum Name Length is 5").isLength({min: 5}),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be minimum 5 characters long").isLength({min: 5})
], (req, res) => {
    // console.log(req.body)//req ko read kia
    // const user = User(req.body)
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }).then(user => res.json(user))
    .catch(err=>{console.log(err)
        res.json({error: "This credential is already registered with us, please enter a diffrent value", message: err.message})
    })

    // res.send(req.body)//res send krr dia 
    // user.save()
})

module.exports = router