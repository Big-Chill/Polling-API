const path = require('path');
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;

const db = require(path.join(__dirname, 'config', 'mongoose'));
const corsOption = require(path.join(__dirname, 'config', 'cors'));
const questionRouter = require(path.join(__dirname, 'route', 'questionRouter'));
const optionRouter = require(path.join(__dirname, 'route', 'optionRouter'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));


app.use('/questions', questionRouter);
app.use('/options', optionRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

