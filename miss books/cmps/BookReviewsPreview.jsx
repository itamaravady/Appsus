import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM


export class BookReviewsPreview extends React.Component {

    state = {
        isLongTextShown: false
    }

    getFullReviewTxt = () => {
        const { isLongTextShown } = this.state
        const { bookReview } = this.props

        if (isLongTextShown) return bookReview.fullReview
        return bookReview.fullReview.substring(0, 50)
    }

    getMoreLess = () => {
        const { isLongTextShown } = this.state
        if (isLongTextShown) return ' Less...'
        return ' More...'

    }

    changeState = () => {
        let { isLongTextShown } = this.state
        isLongTextShown = !isLongTextShown
        this.setState({ isLongTextShown })
    }

    onRemoveReview = () => {
        const { bookReview, book } = this.props
        bookService.removeReview(bookReview.id, book.id)
        eventBusService.emit('user-msg',{text:'Deleted Review !', type:'danger'})
    }

    render() {

        const { bookReview } = this.props
        if (!bookReview) return

        return (
            <div className="review-card">
                <h4>Name : {bookReview.name}</h4>
                <h5>Date : {bookReview.date} {'&&'} Rating: {bookReview.stars} ⭐</h5>
                <p>{this.getFullReviewTxt()}
                    {bookReview.fullReview.length > 50 && < span onClick={() => this.changeState()} className='more-less-desc'>
                        {this.getMoreLess()}
                    </span>}
                </p>
                <Link onClick={this.onRemoveReview} to="/book">Delete</Link>
            </div >

        )

    }
}