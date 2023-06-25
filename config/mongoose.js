const mongoose = require('mongoose');
const mongodb_url = 'mongodb+srv://rohit_nandy:abcdwxyz@poll.hy6r4j3.mongodb.net/'

mongoose.set('strictQuery', false); // To allow queries like: Model.find({ $or: [{ name: 'John' }, { name: 'Jane' }] }


// Connect to MongoDB
mongoose.connect(mongodb_url, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});