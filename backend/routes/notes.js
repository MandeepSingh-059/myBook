const express = require("express")
const router = express.Router()

//without router we would do app.get(req, res) here req is request and res is response
router.get("/", (req, res) => {
    // obj = {//this is the json object
    //     a: "eg",
    //     num: 123
    // }
    // res.json(obj)//result is a json object
    res.json([])
})

module.exports = router