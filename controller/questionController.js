const path = require('path');
const questionModel = require(path.join(__dirname, '..', 'model', 'question'));
const optionModel = require(path.join(__dirname, '..', 'model', 'option'));
const { generateVotingLink } = require(path.join(__dirname, '..', 'utils', 'misc'));

// POST /question/create

const mongoose = require('mongoose');
const createQuestion = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: 'Question title is required',
            });
        }

        const newQuestion = new questionModel({
            title: title,
        });
        await newQuestion.save();
        res.status(200).json({
            message: 'Question created successfully',
            question: newQuestion,
        });
    } catch (err) {
        console.log(`Error in questionController.createQuestion: ${err}`); // eslint-disable-line no-console
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
};

// POST /question/:id/option/create

const createOption = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: 'Option text is required',
            });
        }

        const question = await questionModel.findById(id);
        if (!question) {
            return res.status(400).json({
                message: 'Question not found',
            });
        }

    
        const newOption = new optionModel({
            text: text,
            link_to_vote: '',
            question: question._id,
        });
        newOption.link_to_vote = generateVotingLink(newOption._id);
        await newOption.save();
        question.options.push(newOption);
        await question.save();

        
        res.status(200).json({
            message: 'Option created successfully',
            option: newOption,
        });
    } catch (err) {
        console.log(`Error in questionController.createOption: ${err}`); // eslint-disable-line no-console
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
};



// GET /questions/:id

const getQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await questionModel.findById(id).populate('options');
        if (!question) {
            return res.status(400).json({
                message: 'Question not found',
            });
        }

        res.status(200).json({
            message: 'Question found',
            question: question,
        });
    } catch (err) {
        console.log(`Error in questionController.getQuestion: ${err}`); // eslint-disable-line no-console
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
};


// DELETE /questions/:id/delete
// A question cant be deleted if one of its options has more than 0 votes

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        const question = await questionModel.findById(id).populate('options');
        if (!question) {
            return res.status(400).json({
                message: 'Question not found',
            });
        }

        const options = question.options;
        for (let i = 0; i < options.length; i++) {
            if (options[i].votes > 0) {
                return res.status(400).json({
                    message: 'Question cant be deleted as one of its options has more than 0 votes',
                });
            }
        }

        await questionModel.findByIdAndDelete(id);
        // Also delete all the options of the question
        for (let i = 0; i < options.length; i++) {
            await optionModel.findByIdAndDelete(options[i]._id);
        }
        
        res.status(200).json({
            message: 'Question deleted successfully',
        });
    } catch (err) {
        console.log(`Error in questionController.deleteQuestion: ${err}`); // eslint-disable-line no-console
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
};

module.exports = {
    createQuestion,
    createOption,
    getQuestion,
    deleteQuestion,
};