
const router = require('express').Router();
const { notes } = require ('../data/db.json');
const uuid = require('uuid');
const { validateNotes, addNote, deleteNote } = require ('../lib/notes');

router.get('/notes', (req, res) => {
    console.log(notes);
    res.json(notes);
    
}); 

router.post('/notes', (req, res) => {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    if (!validateNotes(newNote)) {
        return res.status(400).send("Please enter a title and text in the correct format");
    } else {
        addNote(newNote, notes);
        res.json(notes);
    }   
});

router.delete('/notes/:id', (req, res) => {
    console.log("delete router got hit");
    const exists = notes.some(notes => notes.id === req.params.id);
    
    if (exists) {
        return res.json(deleteNote(req.params.id, notes));
    } else {
        res.status(400).send(`No notes found with the id ${req.params.id}`)
    }

});

module.exports = router;