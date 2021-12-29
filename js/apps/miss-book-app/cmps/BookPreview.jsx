import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {

    return (
        <Link className="clean-link" to={`/book/${book.id}`}>
            <article className="book-preview" >
                <img src={book.thumbnail} />
                <h3>{book.title}</h3>
                <h4>{book.listPrice.amount}<span> {utilService.getCurrency(book)}</span></h4>
            </article >
        </Link>
    )
}

