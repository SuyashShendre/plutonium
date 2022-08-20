const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")

router.post("/createAuthor", authorController.createAuthor)

router.post("/createBook", bookController.createBook)

router.post("/createPublisher", publisherController.createPublisher)

router.get("/getBooksWithAllDetails", bookController.getBooksWithAllDetails)

router.put("/updateBook", bookController.updateBook)

module.exports = router;