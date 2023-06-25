const path = require('path');
const questionModel = require(path.join(__dirname, '..', 'model', 'question'));
const optionModel = require(path.join(__dirname, '..', 'model', 'option'));

// GET /options/:id/add_vote

const addVote = async (req, res) => {
    try {
        const { id } = req.params;
        const option = await optionModel.findById(id);
        if (!option) {
            return res.status(400).json({
                message: 'Option not found',
            });
        }

        option.votes += 1;
        await option.save();
        res.status(200).json({
            message: 'Vote added successfully',
            option: option,
        });
    } catch (err) {
        console.log(`Error in optionController.addVote: ${err}`); // eslint-disable-line no-console
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
};


// DELETE /options/:id/delete
// An option cant be deleted if it has votes

const deleteOption = async (req, res) => {
    try {
        const { id } = req.params;
        const option = await optionModel.findById(id);
        if (!option) {
            return res.status(400).json({
                message: 'Option not found',
            });
        }

        if (option.votes > 0) {
            return res.status(400).json({
                message: `Option cant be deleted, it has ${option.votes} votes`,
            });
        }

        const question = await questionModel.findById(option.question);
        question.options.pull(option);
        await question.save();
        await optionModel.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Option deleted successfully',
        });
    } catch (err) {
        console.log(`Error in optionController.deleteOption: ${err}`); // eslint-disable-line no-console
        res.status(500).json({
            message: 'Something went wrong',
            error: err,
        });
    }
};


module.exports = {
    addVote,
    deleteOption,
};