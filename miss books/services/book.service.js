import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const bookService = {
    getById,
    query,
    add,
    update,
    remove,
    addReview,
    removeReview,
    addGoogleBook,
    addBook,
    getNextPrevById
}

const KEY = 'booksDB'
const GOOGLEKEY = 'googleBooksDB'
let gBooks = {}

_createBooks()

function query(filterBy) {
    const books = _loadFromStorage()
    if (!filterBy) return Promise.resolve(books)
    const filteredBooks = _getFilteredBooks(books, filterBy)
    return Promise.resolve(filteredBooks)
}

function _getFilteredBooks(books, filterBy) {
    // console.log(filterBy);
    let { name, minPrice, maxPrice } = filterBy
    // console.log(name);
    minPrice = minPrice ? minPrice : 0
    maxPrice = maxPrice ? maxPrice : Infinity
    return books.filter(book => {
        return book.title.toLowerCase().includes(name.toLowerCase()) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice
    })
}

function getById(bookId) {
    const books = _loadFromStorage()
    const book = books.find(book => bookId === book.id)
    return Promise.resolve(book)
}

function getNextPrevById(bookId, diff) {
    const books = _loadFromStorage()
    const bookIdx = books.findIndex(book => bookId === book.id)
    let nextBookIdx = bookIdx + diff
    const book = books[nextBookIdx]
    if (nextBookIdx === -1) return books[nextBookIdx + 1].id
    else if (nextBookIdx === books.length) return books[0].id
    return book.id
}

function addReview(bookId, review) {
    const books = _loadFromStorage()

    const book = books.find(book => book.id === bookId)
    if (!review.date) {
        const date = new Date()
        review.date = (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    if (!review.stars) {
        review.stars = 1
    }
    review['id'] = utilService.makeId()
    book.reviews = [review, ...book.reviews]
    _saveToStorage(books)
    return Promise.resolve()
}

function removeReview(reviewId, bookId) {
    const books = _loadFromStorage()
    const book = books.find(book => book.id === bookId)
    console.log(book);
    book.reviews = book.reviews.filter(review => review.id !== reviewId)
    _saveToStorage(books)
    return Promise.resolve()
}

function addGoogleBook(googleBook) {
    gBooks = storageService.loadFromStorage(GOOGLEKEY) || {}
    if (gBooks[googleBook]) {
        console.log('FROM CACHE');
        return Promise.resolve(gBooks[googleBook])
    }

    return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${googleBook}`)
        .then(res => {
            const books = res.data.items.filter((book, idx) => {
                if (idx >= 5) return
                return book
            }
            )
            gBooks[googleBook] = books
            storageService.saveToStorage(GOOGLEKEY, gBooks)
            return books
        }
        )
        .catch(err => {
            console.log('Cannot get ans', err);
            throw err
        })

}

function addBook(selectedBook) {
    let books = _loadFromStorage()
    const book = {
        title: selectedBook['volumeInfo']['title'],
        id: selectedBook.id,
        description: selectedBook['volumeInfo']['description'],
        publishedDate: +selectedBook['volumeInfo']['publishedDate'].substring(0, selectedBook['volumeInfo']['publishedDate'].indexOf('-')),
        thumbnail: selectedBook['volumeInfo']['imageLinks']['thumbnail'],
        reviews: [],
        pageCount: +selectedBook['volumeInfo']['pageCount'],
        listPrice: {
            amount: utilService.getRandomIntInclusive(50, 200),
            isOnSale: Math.random() > 0.5 ? true : false,
            currencyCode: 'ILS'
        }
    }

    books = [book, ...books]
    _saveToStorage(books)
    return Promise.resolve()
}

function remove(bookId) {
    var books = _loadFromStorage()
    books = books.filter(book => book.id !== bookId)
    _saveToStorage(books)
    return Promise.resolve()
}

function add(vendor, speed) {
    var cars = _loadFromStorage()
    const car = _createCar(vendor, speed)
    cars = [car, ...cars]
    _saveToStorage(cars)
    return Promise.resolve(car)
}

function update(carId, maxSpeed) {
    var cars = _loadFromStorage()
    var car = cars.find(car => car.id === carId)
    car = { ...car, maxSpeed }
    _saveToStorage(cars)
    return Promise.resolve(car)
}

function _createBooks() {
    const books = _loadFromStorage()
    if (!books || !books.length) {
        let books = utilService.getBooks()
        books = books.map(book => {
            return book = { ['reviews']: [], ...book }
        })
        _saveToStorage(books)
    }
}

function _saveToStorage(books) {
    storageService.saveToStorage(KEY, books)
}
function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}
