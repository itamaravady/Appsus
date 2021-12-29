export class BookFilter extends React.Component {

    state = {
        filterBy: {
            title: '',
            price: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;

        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy);
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy);
        this.cleanForm();
    }

    cleanForm() {
        this.setState({ filterBy: { title: '', price: '' } })
    }

    render() {
        const { title, price } = this.state.filterBy;
        return (

            <form classtitle="book-filter" onSubmit={this.onSubmitFilter}>
                <label htmlFor="by-title">By Title:
                    <input
                        type="text"
                        placeholder="Enter Title"
                        id="by-title"
                        name="title"
                        value={title}
                        onChange={this.handleChange} />
                </label>
                <label htmlFor="by-price">Max Price:
                    <input
                        type="number"
                        placeholder="Enter max price"
                        id="by-price"
                        name="price"
                        value={price}
                        onChange={this.handleChange} />
                </label>
                <button>Filter</button>
            </form>

        )
    }
}