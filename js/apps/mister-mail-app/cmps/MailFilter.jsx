

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            status: '',
            txt: '',
            isRead: 'all',
            isStared: '',
            lables: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        if (value === 'true') value = true
        if (value === 'false') value = false
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    cleanForm = () => {
        const filterBy = this.state
        this.setState({ ...filterBy, filterBy: { txt: '', isRead: 'all' } })
    }

    render() {
        const { filterBy: { txt, isRead } } = this.state
        return (
            <form className="mail-filter" onSubmit={this.onSubmitFilter}>
                <button className="mail-filter-btn" type="submit">🔍</button>
                <input type="search" name="txt" className="search-mail-input" placeholder="Search..." value={txt} onChange={this.handleChange} />
                <select name="isRead" onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value={true}>Read</option>
                    <option value={false}>Unread</option>
                </select>
            </form>
        )
    }
}