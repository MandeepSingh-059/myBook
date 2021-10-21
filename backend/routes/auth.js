const express = require("express")
const User = require("../models/User")
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "IAmLearningWebDevlopement"

//without router we would do app.get(req, res) here req is request and res is response
//Create a user using: POST "/api/auth/createuser". Dosent require Authentication, no login required

router.post("/createuser", [
    body('name', "Minimum Name Length is 5").isLength({ min: 5 }),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be minimum 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    // console.log(req.body)//req ko read kia
    // const user = User(req.body)

    //if error then we return the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check if a user with same email already exists 
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry this email is already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        secPass = await bcrypt.hash(req.body.password, salt)

        //creating a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({authtoken})
        // res.json(user)
    } catch (error) {
        console.error(error.message)
        resa.status(500).send("Something went wrong")
    }

    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    //     res.json({error: "This credential is already registered with us, please enter a diffrent value", message: err.message})
    // })

    // res.send(req.body)//res send krr dia 
    // user.save()
})

module.exports = router