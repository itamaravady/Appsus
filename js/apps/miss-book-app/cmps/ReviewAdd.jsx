import { utilService } from '../../../services/util.service.js'
import { bookService } from '../services/book.service.js'

export class ReviewAdd extends React.Component {
    state = {
        review: {
            fullName: 'Books Reader',
            rate: '5',
            readAt: utilService.getFormatedDate(),
            reviewContent: '',
        },
    }

    handleChange = ({ target }) => {
        const value = target.type === 'number' ? +target.value : target.value;
        const field = target.name;
        this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }));
    }

    submit = (ev) => {
        ev.preventDefault();
        bookService.addReview(this.props.book, this.state.review)
            .then(this.props.onAddReview());
        this.clearForm();

    }

    clearForm() {
        this.setState({
            review: {
                fullName: 'Books Reader',
                rate: '5',
                readAt: utilService.getFormatedDate(),
                reviewContent: '',
            },
        })
    }


    render() {
        console.log('render');
        const { fullName, rate, readAt, reviewContent } = this.state.review;
        return (
            <form className="add-review" onSubmit={this.submit}>
                <label>
                    Full Name:
                    <input type="text" name="fullName" value={fullName} onChange={this.handleChange} />
                </label>
                <label>
                    Rate:
                    <select name="rate" value={rate} onChange={this.handleChange}>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select>
                </label>
                <label>
                    Read At:
                    <input type="date" name="readAt" value={readAt} onChange={this.handleChange} />
                </label>
                <label>
                    Review:
                    <textarea required name="reviewContent" value={reviewContent} onChange={this.handleChange} />
                </label>
                <button>Add</button>
            </form>
        )
    }
}