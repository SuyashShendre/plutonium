const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")
const authorModel = require("../models/authorModel")

const createBook = async function (req, res) {
    let book = req.body

    if (!book.author) return res.send({ msgs: "Author not present" })

    let savedAuthData = await authorModel.findById(book.author)
    if (!savedAuthData) return res.send("Invalid Author")

    if (!book.publisher) return res.send({ msgs: "Publisher not present" })

    let savedPubData = await publisherModel.findById(book.publisher)
    if (!savedPubData) return res.send("Invalid Publisher")

    let bookCreated = await bookModel.create(book)
    res.send({ data: bookCreated })
}

const getBooksWithAllDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author publisher')
    res.send({ data: specificBook })
}

const updateBook = async function (req, res) {
    //for hardcover
    let data = await publisherModel.find({ name: ["HarperCollins Publishers India", "Penguin Random House India"] }).select("_id")
    await bookModel.updateMany({ publisher: data }, { $set: req.body }) // {$set: isHardCover:true}
    //for price increase by 10
    let authorRating = await authorModel.find({ rating: { $gt: 3.5 } }).select("_id")
    await bookModel.updateMany({ author: authorRating }, { $inc: { price: +10 } })

    let specificBook = await bookModel.find().populate('author publisher')
    res.send({ data: specificBook })
}

module.exports.createBook = createBook
module.exports.getBooksWithAllDetails = getBooksWithAllDetails
module.exports.updateBook = updateBook
