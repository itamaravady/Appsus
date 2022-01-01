

export class MailFilter extends React.Component {
    state = {
        filterBy: {
            txt: '',
            isRead: 'all',
            isStarred: false,
            status: '',
            lables: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        if (value === 'true') value = true
        if (value === 'false') value = false
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            if (field === 'isRead') {
                this.props.onSetFilter(this.state.filterBy)
                this.props.onGoBack()
            }
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
        this.props.onGoBack()
        this.cleanForm()
    }

    cleanForm = () => {
        const filterBy = this.state
        this.setState({ ...filterBy, filterBy: { txt: '', isRead: 'all' } })
    }

    render() {
        const { filterBy: { txt } } = this.state
        return (
            <form className="mail-filter" onSubmit={this.onSubmitFilter}>
                <div className="main-filter">
                    <div className="burger" onClick={this.props.onToggleNav}> ≡ </div>
                    <button className="mail-filter-btn" type="submit">🔍</button>
                    <input type="search" name="txt" className="search-mail-input" placeholder="Search..." value={txt} onChange={this.handleChange} />
                    <select name="isRead" onChange={this.handleChange}>
                        <option value="all">All</option>
                        <option value={true}>Read</option>
                        <option value={false}>Unread</option>
                    </select>
                </div>
            </form>
        )
    }
}