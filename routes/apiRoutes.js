
const router = require('express').Router();
let { notes } = require ('../data/db.json');
const uuid = require('uuid');
const { validateNotes, addNote } = require ('../lib/notes');
const fs = require('fs');
const path = require('path');

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
        notes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync(
                path.join(__dirname, '../data/db.json'),
                JSON.stringify({ notes }, null, 2)
              );
        res.json(notes);
    } else {
        res.status(400).send(`No notes found with the id ${req.params.id}`)
    }

});

module.exports = router;