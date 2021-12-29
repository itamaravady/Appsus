import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    getById,
    query,
    add,
    update,
    remove,
    addReview,
    removeReview,
    addGoogleBook,
    addBook,
    getNextPrevById,
    changeReadMail
}

const KEY = 'mailsDB'

const gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
// const GOOGLEKEY = 'googleBooksDB'
// let gMails = {}

_createMails()

function query(filterBy) {
    const mails = _loadFromStorage()
    if (!filterBy) return Promise.resolve(mails)
    const filteredBooks = _getFilteredMails(mails, filterBy)
    return Promise.resolve(filteredBooks)
}

function _getFilteredMails(mails, filterBy) {
    let { txt, isRead } = filterBy
    const txtFilteredMails = mails.filter(mail => {
        return mail.subject.toLowerCase().substring(0, txt.length) === txt.toLowerCase() ||
            mail.from.toLowerCase().substring(0, txt.length) === txt.toLowerCase()
    })

    if (isRead === 'all') return txtFilteredMails
    const filteredMails = txtFilteredMails.filter(mail => {
        return mail.isRead === isRead
    })
    return filteredMails

}

function getById(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
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
    gBooks = storageService.load(GOOGLEKEY) || {}
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
            storageService.save(GOOGLEKEY, gBooks)
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

function _createMails() {
    const mails = _loadFromStorage()
    if (!mails || !mails.length) {
        let mails = getMails()

        _saveToStorage(mails)
    }
}

function changeReadMail(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mail.id === mailId)
    mail.isRead = true
    _saveToStorage(mails)
    console.log(mails);
}



function _saveToStorage(mails) {
    storageService.save(KEY, mails)
}
function _loadFromStorage() {
    return storageService.load(KEY)
}



function getMails() {
    return [
        {
            id: utilService.makeId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: Date.now(),
            to: gLoggedinUser.email,
            from: 'Shuki',
            fromMail: 'Shuki@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'wassup?',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 15511339319,
            to: gLoggedinUser.email,
            from: 'Puki',
            fromMail: 'Puki@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'wassup?',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551,
            to: gLoggedinUser.email,
            from: 'Rooki',
            fromMail: 'Rooki@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'play a game bruh',
            body: 'Wanna play some basketball??',
            isRead: false,
            sentAt: 155113,
            to: gLoggedinUser.email,
            from: 'Steph Curry',
            fromMail: 'Steph@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Money man...',
            body: 'I really need the money back bro, not cool!',
            isRead: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'My Brother',
            fromMail: 'Bro@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'The Date',
            body: 'So when will you pick me up???',
            isRead: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Jennifer Aniston',
            fromMail: 'jennn111@gmail.com'
        },
        {
            id: utilService.makeId(),
            subject: 'Promblem brother',
            body: 'if you touch Jennnifer, you wiil have a problem with me man!',
            isRead: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Ben Afleck',
            fromMail: 'BatmanCool@gmail.com'
        },
    ]
}