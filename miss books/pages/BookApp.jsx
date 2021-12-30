import { BookList } from '../cmps/BookList.jsx'
import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'
import { eventBusService } from '../services/event-bus.service.js'

export class BookApp extends React.Component {

    state = {
        books: [],
        fiterBy: null
    }

    componentDidMount() {
        this.loadBooks()
    }


    loadBooks = () => {
        const { filterBy } = this.state
        bookService.query(filterBy).then(books => {
            this.setState({ books })
        })
    }

    onAddBook = (selectedBook) => {
        console.log(selectedBook);
        bookService.addBook(selectedBook).then(() => {
            this.loadBooks()
            eventBusService.emit('user-msg', { text: 'Added book !', type: 'success' })
        }
        )
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }


    render() {
        const { books } = this.state
        return (
            <section className="book-app">
                <div className="filter-container">
                    <BookFilter onSetFilter={this.onSetFilter} />
                </div>
                <BookAdd onAddBook={this.onAddBook} />

                <BookList books={books} onSelectBook={this.onSelectBook} />
            </section>)
    }
}


