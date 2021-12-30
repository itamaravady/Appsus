import { LongTxt } from '../cmps/LongTxt.jsx'
import { bookService } from '../services/book.service.js'
import { Loader } from '../cmps/Loader.jsx'
import { BookReviewsPreview } from '../cmps/BookReviewsPreview.jsx'
import { eventBusService } from '../services/event-bus.service.js'


const { Link } = ReactRouterDOM



export class BookDetails extends React.Component {

    state = {
        book: '',
        isLongTxtShown: false
    }

    componentDidMount() {
        // console.log('hi mounting');
        this.loadBook()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
            this.loadBook()
        }
    }

    loadBook = () => {
        const { bookId } = this.props.match.params
        console.log('bookId in bookDeatails', bookId);
        bookService.getById(bookId).then(book => {
            if (!book) return this.props.history.push('/')
            this.setState({ book })
            // console.log(book);
        })
    }

    onBack = () => {
        this.props.history.push('/book')
    }

    onRemove = () => {
        const { id } = this.state.book
        bookService.remove(id).then(() => {
            eventBusService.emit('user-msg', { text: 'Deleted book !', type: 'danger' })
            this.onBack()
        }
        )
    }

    get getPrice() {
        const { book } = this.state
        const price = (book.listPrice.amount).toLocaleString(book.listPrice.currencyCode, {
            style: 'currency',
            currency: book.listPrice.currencyCode,
        })

        return price

    }
    get getPriceColor() {
        const { book } = this.state
        // console.log(book);
        let classColor = 'green';
        if (book.listPrice.amount < 20) return classColor = 'green'
        else if (book.listPrice.amount > 150) return classColor = 'red'
        else return classColor = ''

    }

    get getPublishedDateTxt() {
        const { book } = this.state
        let year = new Date().getFullYear()
        let publishedDateTxt;
        if (year - book.publishedDate <= 1) return publishedDateTxt = 'New!'
        else if (year - book.publishedDate >= 10) return publishedDateTxt = 'Veteran Book!'
        else return publishedDateTxt = null

    }


    get getPublishedTxt() {
        const { book } = this.state
        let publishedTxt;
        if (book.pageCount > 500) return publishedTxt = 'Long reading'
        else if (book.pageCount > 200) return publishedTxt = 'Decent reading'
        else return publishedTxt = 'Light reading'

    }

    get getSaleImg() {
        const { book } = this.state
        let saleImg
        if (book.listPrice.isOnSale) return saleImg = <img src="assets/img/sale.jpg" />
    }



    render() {

        const { book } = this.state
        if (!book) return <Loader />

        return (
            <section className="details-section">
                <h2 className='link-header'> Give us your opinion <Link className='link-review' to={`/book/review/${book.id}`}> Here!</Link></h2>
                <div className="book-details">
                    <h2>{book.title} </h2>
                    <h4 className={this.getPriceColor}>Price : {this.getPrice}</h4>
                    <div className="container">
                        <h5 className='details-small'><small>{this.getPublishedTxt} {this.getPublishedDateTxt && ',' + this.getPublishedDateTxt}</small></h5>
                        <div className="sale-container">
                            {this.getSaleImg}
                        </div>
                    </div>
                    <div className="side-by-side-container">
                        <div className="img-details-container">
                            <img src={`${book.thumbnail}`} />
                        </div>
                        <div className="description">
                            <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} />
                        </div>
                    </div>
                </div>

                <div className="review-container">
                    {book.reviews.map(review => <BookReviewsPreview key={review.id} bookReview={review} book={book} />)}
                </div>
                <div className="btn-container">
                    <button onClick={this.onBack}>Go back</button>
                    <button onClick={() => this.onRemove(book.id)}>Remove book</button>
                </div>
                <div className="moving-books-btns">
                    <Link className="clean-link" to={`/book/${bookService.getNextPrevById(book.id, -1)}`}>Previous Book</Link>
                    <Link className="clean-link" to={`/book/${bookService.getNextPrevById(book.id, 1)}`}>Next Book</Link>
                </div>
            </section >
        )
    }

}