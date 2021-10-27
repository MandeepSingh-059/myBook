const express = require("express")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator')



//Route 1: Get all the notes of a user using GET  */api/fetchallnotes*.Login required

//without router we would do app.get(req, res) here req is request and res is response
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    // obj = {//this is the json object
    //     a: "eg",
    //     num: 123
    // }
    // res.json(obj)//result is a json object

    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")        
    }


})

//Route 2: Add a new note using POST  */api/addnote*.Login required
router.post("/addnote", fetchuser, [
    body('title', "Minimum Length is 5").isLength({ min: 5 }),
    body('description', "Description must be minimum 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {title, description, tag} = req.body
        
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        
        res.json(savedNote);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router