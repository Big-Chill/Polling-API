const express = require('express');
const path = require('path');
const optionController = require(path.join(__dirname, '..', 'controller', 'optionController'));

const router = express.Router();

router.get('/:id/add_vote', optionController.addVote);
router.delete('/:id/delete', optionController.deleteOption);

module.exports = router;