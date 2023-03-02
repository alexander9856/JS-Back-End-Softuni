const { getErrorMessage } = require('../utils/errorUtils')
const authService = require('../services/bookService');
const bookService = require('../services/bookService')
const getCatalogPage = async (req, res) => {
    const books = await bookService.getAll()
    res.render('catalog', { books })
}

const getCreatePage = async (req, res) => {
    res.render('create')
}
const postCreatePage = async (req, res) => {
    const bookData = req.body
    try {
        await authService.create(req.user._id, bookData)
        res.redirect('/catalog')
    }
    catch (error) {
        res.status(400).render('create', { error: getErrorMessage(error) })
    }
}

const getDetailsPage = async (req, res) => {
    const bookId = req.params.bookId
    const book = await bookService.getById(bookId);
    const isOwner = book.owner == req.user?._id;
    const isWished = book.wishlist.some(x => x == req.user?._id)
    res.render('details', { book, isOwner, isWished })
}
const wishBook = async (req, res) => {
    await bookService.wish(req.user._id, req.params.bookId);
    res.redirect(`/${req.params.bookId}/details`)
}
const getEditPage = async (req, res) => {
    const bookId = req.params.bookId
    const book = await bookService.getById(bookId);
    res.render('edit', { book })
}

const postEditPage = async (req, res) => {
    const book = req.body;
    const bookId = req.params.bookId
    try {
        await bookService.edit(bookId, book)

        res.redirect(`/${bookId}/details`)
    }
    catch (error) {
        res.status(400).render(`edit`, { error: getErrorMessage(error), book })
    }

}

const deleteBook = async (req, res) => {
    const bookId = req.params.bookId
    await bookService.delete(bookId)
    res.redirect(`/catalog`)
}


const getProfilePage = async (req, res) => {
    const user = req.user;
    let wishedBooks = [];
    let allBooks = await bookService.getAll().populate('wishlist').lean()

    // for (let i of allBooks) {
    //     for (let j of i.wishlist) {
    //         if (j._id == user._id) {
    //             wishedBooks.push(i)
    //         }
    //     }
    // }
    allBooks.map(x => x.wishlist.some(j => j._id == user._id ? wishedBooks.push(x) : ''))
    res.render('profile', { wishedBooks, user })
}




module.exports = {
    getCatalogPage,
    getCreatePage,
    postCreatePage,
    getDetailsPage,
    wishBook,
    getEditPage,
    postEditPage,
    deleteBook,
    getProfilePage
}