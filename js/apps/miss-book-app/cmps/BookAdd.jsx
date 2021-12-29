import { utilService } from "../../../services/util.service.js"
import { AddBooksList } from './AddBooksList.jsx'
import { bookService } from '../services/book.service.js'
import { eventBusService } from '../../../services/eventBusService.js'

export class BookAdd extends React.Component {
    state = {
        bookName: '',
        books: null,
    }

    handleChange = ({ target }) => {
        console.log('handling change', target.value);
        const field = target.name
        const value = target.value;
        this.setState({ [field]: value })

    }

    submit = (ev) => {
        ev.preventDefault();
        bookService.searchBooks(this.state.bookName)
            .then(books => books.map(book => this.generateBook(book)))
            .then(books => this.setState({ books }))
            .catch(this.setState({ books: null }))
    }


    generateBook(book) {
        return {
            id: utilService.makeId(),
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            description: book.volumeInfo.description,
            categories: book.volumeInfo.categories,
            authors: book.volumeInfo.authors,
            publishedDate: book.volumeInfo.publishedDate.slice(0, 4),
            pageCount: book.volumeInfo.pageCount,
            thumbnail: book.volumeInfo.imageLinks.thumbnail,
            language: book.volumeInfo.language,
            listPrice: {
                amount: parseInt(Math.random() * 100),
                currencyCode: (Math.random() <= 0.33) ? 'ILS' : (Math.random() <= 0.5 ? 'USD' : 'EUR'),
                isOnSale: Math.random() > 0.5 ? true : false,
            }
        }

    }

    onAddBook = (book) => {
        bookService.addGoogleBook(book)
            .then(() => {
                console.log(book);
                eventBusService.emit('user-msg', { txt: `Book ${book.title} was successfully added`, type: book, name: 'book' })
                this.setState({ books: null })
            });
        // .then(bookId => console.log(this.props));
    }

    render() {
        const { bookName, books } = this.state;
        return (
            <div className="book-add">
                <form onSubmit={this.submit}>
                    <div className='search-bar'>
                        <label>Search Books Online:
                            <input
                                placeholder="Enter Book Name"
                                autoComplete="off"
                                type="search"
                                name="bookName"
                                value={bookName}
                                onChange={this.handleChange} />
                        </label>
                        {books && <AddBooksList addBook={this.onAddBook} books={books} />}
                    </div>
                    <button>Search</button>
                </form>
            </div>
        )
    }
}