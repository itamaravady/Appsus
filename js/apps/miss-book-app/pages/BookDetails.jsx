import { utilService } from '../../../services/util.service.js'
import { bookService } from '../services/book.service.js'
import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { Loader } from '../../../cmps/Loader.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx'
import { ReviewList } from '../cmps/ReviewList.jsx'

export class BookDetails extends React.Component {

    state = {
        book: null,
        isLongTxtShown: false,
        isAddReview: false
    }
    componentDidMount() {
        this.loadBook();
    }

    loadBook = () => {
        const bookId = this.props.match.params.bookId;
        console.log('book id is', bookId);
        bookService.getBookById(bookId)
            .then(book => this.setState({ book }));
    }

    onShowMore = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }

    onBack = () => {
        this.props.history.push('/book')
    }

    checkIsAddReview = () => {
        this.setState({ isAddReview: !this.state.isAddReview })
    }

    render() {
        const { book } = this.state;
        const isLongTxtShown = this.state.isLongTxtShown;
        if (!book) return <Loader />
        return (
            <section className="main-layout">
                <section className="book-details-container" >
                    <div className="img-container">
                        <img src={book.thumbnail} />
                    </div>
                    <article className="book-details">
                        <section className="book-details-heading">
                            <h2>{book.title} <span>{book.listPrice.isOnSale && ' - On Sale!'}</span> </h2>
                            <h3>{book.subtitle}</h3>
                            <h4>Authors: {book.authors}</h4>
                        </section>
                        {<LongTxt onShowMore={this.onShowMore} description={book.description} isLongTxtShown={isLongTxtShown} />}
                        <section className="book-info">
                            <h4 className={'price', _getPriceColor(book)}>{book.listPrice.amount} {utilService.getCurrency(book)}</h4>
                            <h4>{_getBookArrivalDescription(book)}</h4>
                            <h4>{_getReadingLength(book)}</h4>
                            <h4>language: {book.language}</h4>
                            <button onClick={this.onBack}>Back</button>
                        </section>
                    </article>
                </section>
                <section className="book-reviews">
                    <button onClick={this.checkIsAddReview}>{this.state.isAddReview ? 'Close Review' : 'Add Review'}</button>
                    {this.state.isAddReview && <ReviewAdd onAddReview={this.loadBook} book={this.state.book} />}
                    {this.state.book.reviews && <ReviewList book={this.state.book} />}
                </section>
            </section>
        )
    }

}

function _getReadingLength({ pageCount }) {

    if (pageCount > 500) return 'Long Reading';
    if (pageCount > 200) return 'Decent Reading';
    if (pageCount < 100) return 'Long Reading';

}
function _getBookArrivalDescription({ publishedDate }) {

    if (publishedDate > 10) return 'Veteran Book';
    if (publishedDate < 1) return 'New!;'

}

function _getPriceColor({ listPrice }) {
    const price = listPrice.amount;
    if (price > 150) return 'red';
    if (price < 20) return 'green';

}