const mongoose = require('mongoose');
const { Schema } = mongoose;
const questionModel = require('./question');


const optionSchema = new Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
    link_to_vote: { type: String},
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
});

const optionModel = mongoose.model('Option', optionSchema);

module.exports = optionModel;

