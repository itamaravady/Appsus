import { BooksPreview } from '../cmps/BooksPreview.jsx'

export function BookList({ books }) {

    console.log(books);
    return (
        <section className="book-list">
            {books.map(book => <BooksPreview key={book.id} book={book} />)}
        </section>
    )
}
