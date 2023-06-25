const express = require('express');
const path = require('path');
const questionController = require(path.join(__dirname, '..', 'controller', 'questionController'));

const router = express.Router();

router.post('/create', questionController.createQuestion);
router.post('/:id/option/create', questionController.createOption);
router.get('/:id', questionController.getQuestion);
router.delete('/:id/delete', questionController.deleteQuestion);

module.exports = router;