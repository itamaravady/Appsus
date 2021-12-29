import { BookReview } from './BookReview.jsx'

export function ReviewList({ book }) {
    return (
        <ul className="review-list">

            {book.reviews.map(review => <BookReview key={review.fullName + review.readAt} review={review} />)}

        </ul>
    )
}