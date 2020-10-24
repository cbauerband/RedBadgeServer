const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validate-session"); //makes sure you "own" your data, must have token to use
const Book = require("../db").import("../models/book");

router.get("/practice", validateSession, function (req, res) {
  res.send("Hey! This is a practice route!");
});

//* **CREATE BOOK** *//
router.post("/create", validateSession, (req, res) => {
  const bookEntry = {
    date: req.body.book.date,
    title: req.body.book.title,
    author: req.body.book.author,
    cover: req.body.book.cover,
    owner: req.user.id,
    booklist: req.body.book.booklist,
  };
  Book.create(bookEntry)
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//* **GET ALL BOOKS** *//
router.get("/books", validateSession, (req, res) => {
  let userid = req.user.id;
  Book.findAll({
    where: { owner: userid },
  })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err }));
});

//* **GET BOOKS BY USER** *//
router.get("/books/:id", validateSession, (req, res) => {
  let userid = req.user.id;
  Book.findAll({
    where: { owner: userid },
  })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//How do we do get for by booklist? is it the same?
//* **GET BOOKS BY BOOKLIST** *//
router.get("/booklist/:id", validateSession, (req, res) => {
  let userid = req.user.id;
  Book.findAll({
    where: { owner: userid },
  })
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//* **UPDATE BOOK** *//
router.put("/updatebook/:id", validateSession, function (req, res) {
  const updateBook = {
    date: req.body.book.date,
    title: req.body.book.title,
    author: req.body.book.author,
    cover: req.body.book.cover,
    owner: req.user.id,
    booklist: req.body.book.booklist,
  };

  const query = { where: { id: req.params.id, owner: req.user.id } }; //goes by owner, then looks into the id (row of the table)
  //you can only pull however many rows per user there are
  Book.update(updateBook, query)
    .then((books) => res.status(200).json(books))
    .catch((err) => res.status(500).json({ error: err }));
});

//* **DELETE BOOK** *//
router.delete("/deletebook/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner: req.user.id } };

  Book.destroy(query)
    .then(() => res.status(200).json({ message: "Book Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
