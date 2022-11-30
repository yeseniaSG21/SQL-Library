var createError = require('http-errors');
var express = require('express');
var router = express.Router();

//Import Book Model
var { Book } = require('../models');
var book = require('../models/book');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      next(error);
    }
  }
}

/* GET home page */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll({ order: [["createdAt", "DESC"]] });
  res.render("books/index", { books, title: "Library Books" });
}));

/* Home route should redirect to the /books route */
router.get('/', asyncHandler(async (req, res) => {
  res.redirect('books')
}));

/* Shows the full list of books */
router.get('/books', )


/* Shows the create new book form */





/* Posts a new book to the database */





/* Shows book detail form */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render("books/update-book", { book, title: book.title });  
  } else {
    res.sendStatus(404);
  }
})); 

/* Updates book info in the database */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect("/books/" + book.id); 
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("books/update-book", { book, errors: error.errors, title: "Edit Book Entry" })
    } else {
      throw error;
    }
  }
}));

/* Deletes a book */
router.post("/books/:id/delete", asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect("/books");
  } else {
    res.sendStatus(404);
  }
}));

module.exports = router;