const Book = require('../models/Book')

exports.getById = (id) => Book.findById(id).lean()
exports.getAll = () => Book.find().lean()
exports.create = async (owner, bookData) => Book.create({ ...bookData, owner })
exports.wish = async (userId, bookId) => {
    const book = await Book.findById(bookId)
    book.wishlist.push(userId);
    return book.save();
}
exports.edit = async (bookId, bookData) => Book.findByIdAndUpdate(bookId, { ...bookData }, {
    runValidators: true,
    setDefaultsOnInsert: true,
    upsert: true,
})
exports.delete = async (bookId) => Book.findByIdAndDelete(bookId)
exports.search = async (name, paymentMethod) => {
    let book = await this.getAll();
    if (name) {
        book = book.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }
    if (paymentMethod) {
        book = book.filter(x => x.paymentMethod.toLowerCase() == paymentMethod.toLowerCase())
    }
    return book
}

