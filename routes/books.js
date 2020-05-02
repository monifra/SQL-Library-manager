const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(callbackF){
    return async(req, res, next) => {
        try {
            await callbackF(req, res, next)
        } catch(error){
            res.status(500).send(error);
        }
    }
}

/* GET books index */
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll({ order: [['createdAt', 'DESC']]});
    res.render('index', {books, title: 'All Books'});
} ));
/* GET new book form */
router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-book', {book: {}, title: 'New Book'});
} ));
/* POST new book form */
router.post('/new', asyncHandler(async (req, res) => {
    let book;
    book = await Book.create(req.body);
    console.log(req.body);
    res.redirect('/books/');
} ));

/* GET update book form */
router.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id); //finds book by its id
    // console.log(book);
    book
        ?res.render('update-book', { book, title: book.title, h1: 'Update' })
        :res.sendStatus(404);
} ));

/* POST update books info in a database */


module.exports = router;