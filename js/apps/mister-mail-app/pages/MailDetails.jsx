// import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { mailService } from '../services/mail.service.js'
import { Loader } from '../../../cmps/Loader.jsx'
import { eventBusService } from '../../../services/eventBusService.js'

// const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: '',
        isLongTxtShown: false
    }

    componentDidMount() {
        this.loadMail()
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
    //         this.loadMail()
    //     }
    // }

    loadMail = () => {
        const { mailId } = this.props.match.params
        console.log('mailId in mailDeatails', mailId);
        mailService.getById(mailId).then(mail => {
            if (!mail) return this.props.history.push('/mail')
            this.setState({ mail })
        })
    }

    onBack = () => {
        this.props.history.push('/mail')
    }

    onRemove = () => {
        const { id } = this.state.mail
        mailService.remove(id).then(() => {
            eventBusService.emit('user-msg', { txt: 'Deleted mail !', type: this.state.mail, name: 'mail' })
            this.onBack()
        }
        )
    }
    render() {
        const { mail } = this.state
        if (!mail) return <Loader />
        console.log(mail);

        return (
            <section className="details-section">
                <div className="mail-details-header">
                    <h1>{mail.subject}</h1>
                    <ul className="clean-list actions-list">
                        <li onClick={this.onRemove}><img src="assets/img/email-img/trash.png" alt="" /></li>
                        <li><img src="assets/img/email-img/reply.png" alt="" /></li>
                        <li onClick={this.onBack}><img src="assets/img/email-img/back.png" alt="" /></li>
                    </ul>
                </div>
                <h4>{mail.from} <small>{`<${mail.fromMail}>`}</small></h4>
                <p>{mail.body}</p>
            </section>
        )

    }
}



//     render() {

//         const { book } = this.state
//         if (!book) return <Loader />

//         return (
//             <section className="details-section">
//                 <h2 className='link-header'> Give us your opinion <Link className='link-review' to={`/book/review/${book.id}`}> Here!</Link></h2>
//                 <div className="book-details">
//                     <h2>{book.title} </h2>
//                     <h4 className={this.getPriceColor}>Price : {this.getPrice}</h4>
//                     <div className="container">
//                         <h5 className='details-small'><small>{this.getPublishedTxt} {this.getPublishedDateTxt && ',' + this.getPublishedDateTxt}</small></h5>
//                         <div className="sale-container">
//                             {this.getSaleImg}
//                         </div>
//                     </div>
//                     <div className="side-by-side-container">
//                         <div className="img-details-container">
//                             <img src={`${book.thumbnail}`} />
//                         </div>
//                         <div className="description">
//                             <LongTxt text={book.description} isLongTxtShown={this.state.isLongTxtShown} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="review-container">
//                     {book.reviews.map(review => <BookReviewsPreview key={review.id} bookReview={review} book={book} />)}
//                 </div>
//                 <div className="btn-container">
//                     <button onClick={this.onBack}>Go back</button>
//                     <button onClick={() => this.onRemove(book.id)}>Remove book</button>
//                 </div>
//                 <div className="moving-books-btns">
//                     <Link className="clean-link" to={`/book/${bookService.getNextPrevById(book.id, -1)}`}>Previous Book</Link>
//                     <Link className="clean-link" to={`/book/${bookService.getNextPrevById(book.id, 1)}`}>Next Book</Link>
//                 </div>
//             </section >
//         )
//     }

// }