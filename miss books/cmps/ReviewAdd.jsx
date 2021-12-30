
import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js';

export class ReviewAdd extends React.Component {
    state = {
        review: {
            name: 'Books Reader',
            stars: 0,
            date: '',
            fullReview: ''
        }
    }

    inputRef = React.createRef()
    bookId;

    componentDidMount() {
        this.bookId = this.props.match.params.bookId;
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        if (field === 'stars') value = +value
        this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }))
    }

    onGoBack = () => {
        this.props.history.push(`/book/${this.bookId}`)
    }

    submit = (ev) => {
        ev.preventDefault()
        const { review } = this.state;
        bookService.addReview(this.bookId, review).then(() => {
            eventBusService.emit('user-msg', { text: 'Saved !', type: 'success' })
            this.onGoBack()
        })
    }

    render() {
        const { name, fullReview, date } = this.state.review
        return (
            <section className='review-add'>
                <h2>Hello There and Welcome to the Review Section!</h2>
                <form className='review-form' onSubmit={this.submit}>
                    <label htmlFor="full-name">Your name:</label>
                    <input ref={this.inputRef} type="text" id="full-name" name="name" value={name} onChange={this.handleChange} />
                    <select name="stars" onChange={this.handleChange}>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={date} onChange={this.handleChange} />
                    <label htmlFor="full-review">Give your honest opinion:</label>
                    <textarea name="fullReview" id="full-review" cols="30" rows="10" value={fullReview} onChange={this.handleChange}></textarea>
                    <div className="review-btn-container">
                        <button type="submit">Save!</button>
                        <button type="button" onClick={this.onGoBack}>Go Back</button>
                    </div>
                </form>
            </section>
        )
    }
}