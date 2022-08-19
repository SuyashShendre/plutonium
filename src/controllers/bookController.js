const bookModel = require("../models/bookModel")

const createBook = async function (req, res) {
    let book = req.body
    let bookCreated = await bookModel.create(book)
    res.send({ data: bookCreated })
}

const getBooksWithAllDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher')
    res.send({ data: specificBook })

}

module.exports.createBook = createBook
module.exports.getBooksWithAllDetails = getBooksWithAllDetails
