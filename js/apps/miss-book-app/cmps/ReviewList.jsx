import { BookReview } from './BookReview.jsx'

export function ReviewList({ book }) {
    return (
        <ul className="review-list">

            {book.reviews.map((review, idx) => <BookReview key={idx} review={review} />)}

        </ul>
    )
}