const express = require('express')
const router = express.Router()
const fetchuser = require("../middleware/fetchUser")
const { body, validationResult } = require('express-validator');  //for validation
const Note = require("../Models/Note");

//Route 1 :Getting all notes of a user from GET: /api/notes/getallnotes :Login Required
router.get('/getallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        return res.status(500).json({ error: "Intenal server error" });
    }
});

//Route 2 : Adding a new Note to a user from Post: /api/notes/addnote :Login Reguired
router.post('/addnote', fetchuser, [
    body("title", "Enter a Title").isLength({ min: 3 }),
    body("description", "Enter a description").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req); //from express-validator 
    // if there are erros return bad request 400
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        return res.status(500).json({ error: error });
    }

});

//Route 3 : Update Note of a user from Put: /api/notes/addnote :Login Reguired
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        //creating the update note with the values
        const { title, description, tag } = req.body;
        let newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        //finding the note to be updated
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found!");
        }
        //check whether the note belongs to the logged user or not
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        //updating note with the updated values
        newNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(newNote);
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }

});

//Route 4 : Delete Note of a user from Delete: /api/notes/deletenote :Login Reguired
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //find the note to be delted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found");
        }
        //check whether the not belongs to logged user
        if (req.user.id !== note.user.toString()) {
            return res.status(401).send("Not Allowed transaction");
        }
        //delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note deleted", note: note });
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }

});


module.exports = router;    