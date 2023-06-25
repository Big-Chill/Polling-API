const mongoose = require('mongoose');
const { Schema } = mongoose;
const optionModel = require('./option');


const questionSchema = new Schema({
    title: { type: String, unique: true },
    options: [{ type: Schema.Types.ObjectId, ref: 'Option' }],
});

const questionModel = mongoose.model('Question', questionSchema);

module.exports = questionModel;

