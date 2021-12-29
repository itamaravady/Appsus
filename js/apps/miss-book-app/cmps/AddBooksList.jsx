

export function AddBooksList(props) {
    return (
        <ul className="add-books-list clean-list">
            {props.books.map(book => <li key={book.id} onClick={() => props.addBook(book)}>{book.title}</li>)}
        </ul>
    )
}
