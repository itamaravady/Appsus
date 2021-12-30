import { bookService } from "../services/book.service.js"


export class BookAdd extends React.Component {

    state = {
        searchedBook: '',
        booksToShow: []
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState((prevState) => ({ ...prevState, [field]: value }))
    }

    submit = (ev) => {
        ev.preventDefault()
        const { searchedBook } = this.state
        if (!searchedBook) return this.setState({ booksToShow: [] })
        bookService.addGoogleBook(searchedBook)
            .then(books => {
                console.log(books)
                this.setState({ booksToShow: books })
            })
    }


    render() {
        const { searchedBook, booksToShow } = this.state
        return (
            <section className='book-add' >
                <form onSubmit={this.submit}>
                    <input type="search" placeholder="Search..." name='searchedBook' className="search-input" value={`${searchedBook}`} onChange={this.handleChange} />
                    <button className="search-btn" type="submit">Search</button>
                    {(booksToShow.length > 0 &&
                        <React.Fragment>
                            <ul className='google-book-list'>
                                {booksToShow.map(book => {
                                    return <div key={book['id']} className="book-add-card">
                                        <li>{book['volumeInfo']['title']}</li>
                                        <button onClick={() => {
                                            this.props.onAddBook(book)
                                        }} className='add-book-btn'>+</button>
                                    </div>
                                })}
                            </ul>

                        </React.Fragment>)}
                </form>
            </section>
        )
    }
}