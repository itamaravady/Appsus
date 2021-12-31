import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookAdd } from '../cmps/BookAdd.jsx'
import { Loader } from '../../../cmps/Loader.jsx'

export class BookApp extends React.Component {

    state = {
        books: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks() {
        const { filterBy } = this.state;
        bookService.waitQuery(filterBy)
            // bookService.query(filterBy)
            .then(books => {
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    onSelectBook = (book) => {
        this.setState({ selectedBook: book })
    }

    onUnSelectBook = () => {
        this.setState({ selectedBook: null })
    }

    render() {
        const booksToShow = this.state.books;
        return (
            <section className="main-layout">
                <BookAdd history={this.props.history} />
                <BookFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                {!booksToShow.length && <Loader />}
                <BookList books={booksToShow} />

            </section>
        )
    }
}