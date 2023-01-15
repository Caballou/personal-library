const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema({
  title: { type: String, required: true },
  comments: [String]
})

const Books = mongoose.model('books', BooksSchema);

exports.Books = Books;