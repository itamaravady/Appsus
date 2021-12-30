export class BookFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
            minPrice: '',
            maxPrice: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            // this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        this.setState({ filterBy: { name: '', minPrice: '', maxPrice: '' } })
    }

    render() {
        const { filterBy: { name, minPrice, maxPrice } } = this.state
        return (
            <form className="book-filter" onSubmit={this.onSubmitFilter}>
                <label
                    htmlFor="by-name">By name:</label>
                <input
                    placeholder="Enter name"
                    type="text"
                    id="by-name"
                    name="name"
                    value={name}
                    onChange={this.handleChange} />
                <label htmlFor="by-min-price">Min price:</label>
                <input
                    placeholder="Enter minimum price"
                    type="number"
                    min="0"
                    id="by-min-price"
                    name="minPrice"
                    value={minPrice}
                    onChange={this.handleChange} />
                <label
                    htmlFor="by-max-price">Max price:</label>
                <input
                    placeholder="Enter maximum price"
                    type="number"
                    min="0"
                    id="by-max-price"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={this.handleChange} />
                <button>Filter</button>
            </form>
        )
    }
}