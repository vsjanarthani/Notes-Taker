const fs = require('fs');
const path = require('path');

// Function to validate new notes from post request
const validateNotes = newNote => {
    if (!newNote.title || typeof newNote.title !== 'string') {
      return false;
    }
    if (!newNote.text || typeof newNote.text !== 'string') {
      return false;
    }
    return true;
  };

// Function to add new note to the database
const addNote = (newNote, notes) => {
    notes.push(newNote);
    fs.writeFileSync(
      path.join(__dirname, '../data/db.json'),
      JSON.stringify({ notes }, null, 2)
    );
    return notes;
  };

// Function to delete note
const deleteNote = (id, notes) => {
  let updateNotes = notes.filter(note => note.id !== id);
  notes = updateNotes;
  fs.writeFileSync(
    path.join(__dirname, '../data/db.json'),
    JSON.stringify({ notes }, null, 2)
  );
  console.log(`updated array ${notes}`);
  return notes;
}

  module.exports = { validateNotes, addNote, deleteNote };