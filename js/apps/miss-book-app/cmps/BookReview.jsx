export function BookReview({ review }) {
    return (

        <li className="clean-list">
            <h4>Reviewer: {review.fullName} <span>{review.ReadAt}</span> </h4>
            <h5>Rate: {review.rate}</h5>
            <p> {review.reviewContent}</p>
        </li>

    )
}