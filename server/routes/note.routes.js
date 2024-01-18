const NoteController = require('../controllers/note.controller');

module.exports = (app) => {
    app.get('/api/notes', NoteController.getAllNotes); 
    app.post('/api/notes', NoteController.createNote);
    app.get('/api/note/:id', NoteController.getOneNote); 
    app.put('/api/note/:id', NoteController.getOneNoteAndUpdate); 
    app.delete('/api/note/:id', NoteController.deleteNote);
};
