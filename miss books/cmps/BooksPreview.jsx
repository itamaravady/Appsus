
const { Link } = ReactRouterDOM



export function BooksPreview({ book }) {

    const price = (book.listPrice.amount).toLocaleString(book.listPrice.currencyCode, {
        style: 'currency',
        currency: book.listPrice.currencyCode,
    })

    return (

        <Link className="clean-link" to={`/book/${book.id}`}>
            < article
                className="book-preview" >
                <div className="book">
                    <h2>{book.title} </h2>
                    <h4>{price}</h4>
                    <div className="img-container">
                        <img src={`${book.thumbnail}`} />
                    </div>
                </div>
            </article >
        </Link>
    )
}