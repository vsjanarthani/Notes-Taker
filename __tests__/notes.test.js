const { TestScheduler } = require('@jest/core');
const { validateNotes, addNote, deleteNote } = require('../lib/notes.js');

test('validates the new note object', () => {
    const newNote ={
        id: 'eb7fcde8-feb2-42ea-a16f-31f3ad27ff08',
        title: 'File Tax Returns',
        text: 'E-file both federal and state tax return before the deadline'
    };

    validateNotes(newNote);

    expect(newNote.title).not.toBe('');
    expect(newNote.title).toEqual(expect.any(String));
    expect(newNote.text).not.toBe('');
    expect(newNote.text).toEqual(expect.any(String));
});

test('adds a note object to the existing array of notes', () => {

    const newNote = {
        id: 'a1ed490e-1b02-4a69-a02b-3ae0305b0a99',
        title: 'Finish laundry',
        text: 'Complete Laundry by EOD'
    };

    const notesArray = [
        {
            id: '398fd82a-748c-4d2a-8a32-d58632310cba',
            title: 'Book Vaccine Appointment',
            text: 'book the appointment as soon as its available online'
        },
        {
            id: '0ce658e4-7574-411c-bc6c-af2cd823dc0d',
            title: 'Get groceries',
            text: 'list: milk, eggs, bread, banana'
        },
        {
            id: '03f49f47-3d9e-4ae4-9be8-30ebb9da7fdb',
            title: 'Buy new floormats',
            text: 'place an amazon order for floormats'
        },
        {
            id: 'eb7fcde8-feb2-42ea-a16f-31f3ad27ff08',
            title: 'File Tax Returns',
            text: 'E-file both federal and state tax return before the deadline'
        }
    ];

    expect(addNote(newNote, notesArray).length).toEqual(5);

});

test('finds and deletes a note object from the existing array of notes if the id matches', () => {

    const id = '03f49f47-3d9e-4ae4-9be8-30ebb9da7fdb';
    
    const notes = [
        {
          id: '398fd82a-748c-4d2a-8a32-d58632310cba',
          title: 'Book Vaccine Appointment',
          text: 'book the appointment as soon as its available online'
        },
        {
          id: '0ce658e4-7574-411c-bc6c-af2cd823dc0d',
          title: 'Get groceries',
          text: 'list: milk, eggs, bread, banana'
        },
        {
          id: '03f49f47-3d9e-4ae4-9be8-30ebb9da7fdb',
          title: 'Buy new floormats',
          text: 'place an amazon order for floormats'
        },
        {
          id: 'eb7fcde8-feb2-42ea-a16f-31f3ad27ff08',
          title: 'File Tax Returns',
          text: 'E-file both federal and state tax return before the deadline'
        },
        {
          id: 'a1ed490e-1b02-4a69-a02b-3ae0305b0a99',
          title: 'Finish laundry',
          text: 'Complete Laundry by EOD'
        }
      ];  

    expect(deleteNote(id, notes).length).toEqual(4);

});