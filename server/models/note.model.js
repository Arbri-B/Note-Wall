const mongoose = require('mongoose');
const Note = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'The title should be at least 2 characters long'],
        required: [true, 'The title is required'],
        validate: {
            validator: function (value) {
                return value.toLowerCase() !== 'test';
            },
            message: 'Title cannot be the word "test"',
        },
    },
    body: {
        type: String,
        maxLength: [25, 'The body should be shorter than 25 characters'],
        required: [true, 'The body is required'],
        validate: {
            validator: function (value) {
                return value.toLowerCase() !== 'test';
            },
            message: 'Body cannot be the word "test"',
        },
    },
    value: {
        type: Number,
        default: 1,
        min: [1, 'The value should be at least 1'],
        max: [10, 'The value should be at most 10'],
        required: [true, 'The value is required']
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Note', Note);