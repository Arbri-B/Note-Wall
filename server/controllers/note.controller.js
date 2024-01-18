const Note = require('../models/note.model');

module.exports.getAllNotes = (req, res) => {
    Note.find().sort({
            createdAt: -1
        })
        .then((allNotes) => {

            res.json({
                notes: allNotes
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}


module.exports.getOneNote = (req, res) => {
    Note.findOne({
            _id: req.params.id
        })
        .then(oneNote => {
            res.json({
                note: oneNote
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

module.exports.createNote = (req, res) => {
    Note.create(req.body)
        .then(newlyCreatedNote => {
            res.json({
                note: newlyCreatedNote
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

module.exports.getOneNoteAndUpdate = (req, res) => {
    Note.findOneAndUpdate({
                _id: req.params.id
            },
            req.body, {
                new: true
            }
        )
        .then(updatedNote => {
            res.json({
                note: updatedNote
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                message: 'Something went wrong',
                error: err
            })
        });
}

// module.exports.getOnePostAndAddReview = (req, res) => {
//             Note.findOneAndUpdate(
//                 { _id: req.params.id },
//                 { $push:{ reviews:req.body} },
//                 { new: true}
//             )
//                 .then(updatedPost => {
//                     res.json({ post: updatedPost })
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                     res.json({ message: 'Something went wrong', error: err })
//                 });}

module.exports.deleteNote = (req, res) => {
    Note.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            console.log(err)
            res.json({ message: 'Something went wrong', error: err })
        });}