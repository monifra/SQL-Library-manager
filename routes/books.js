const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

//variable checking which error to throw
let checkError;

// const pageSize = 10;
// let page = 0;
// const offset = page * pageSize;
// const limit = pageSize;
// let howManyBooks;
// let howManyPages;

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
    // howManyBooks = await Book.count();
    // howManyPages = Math.ceil(howManyBooks/pageSize)
    // console.log(howManyBooks);
    // console.log(howManyPages);
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
    try {
        book = await Book.create(req.body);
        console.log(req.body);
        res.redirect('/books/');
    } catch (error){
        if(error.name === "SequelizeValidationError") { // checking the error
            book = await Book.build(req.body); // validation error, display the error
            res.render('new-book', { book, errors: error.errors, title: 'New Book' });
        } else {
            throw error; // error caught in the asyncHandler's catch block
        }
    }
} ));

/* GET update book form */
router.get('/:id', asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id); //finds book by its id
    // console.log(req.params.id);
    let err;
    book
        ?res.render('update-book', { book, title: book.title, h1: 'Update' })
        :(err = new Error('Book Page Not Found'), //create 404 status error
            err.statusCode = 404,
            res.render('page-not-found'))
} ));

/* POST update books info in a database */
router.post('/:id', asyncHandler(async (req, res) => {
    let book;
    try {
        book = await Book.findByPk(req.params.id); //finds book by its id
        book
            ? (await book.update(req.body),
                res.redirect('/books/'))
            : res.sendStatus(404)
    } catch (error) {
        if(error.name === "SequelizeValidationError") { // checking the error
            book = await Book.build(req.body); // validation error, display the error
            res.render('update-book', { book, errors: error.errors, title: 'New Book' });
        } else {
            throw error; // error caught in the asyncHandler's catch block
        }
    }
} ));

/* POST delete book */
router.post('/:id/delete', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    book
        ?(await book.destroy(),
            res.redirect('/books'))
        :res.sendStatus(404)
} ));

// //error handling
// router.use((req, res, next) => { //for any not existing rout
//     let err = new Error('This page doesn\'t exist'); //create 404 status error
//     err.statusCode = 404;
//     checkError = false;
//     next(err);
// });

// router.all((req,res,next) =>  {
//     let err = new Error('This page doesn\'t exist'); //create 404 status error
//     err.statusCode = 404;
//     // checkError = false;
//     // next(err);
//     res.render('page-not-found');
// } );
//
// /* Error handler */
// router.use((err, req, res, next)=> {
//     res.locals.error = err;
//     console.log('Error: Something went wrong');
//     (checkError === false)
//         ?res.render('page-not-found') //render error page
//         :res.render('error')
// } );

module.exports = router;