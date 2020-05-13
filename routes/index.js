const express = require('express');
const router = express.Router();

let checkError;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect("/books")
});

module.exports = router;
