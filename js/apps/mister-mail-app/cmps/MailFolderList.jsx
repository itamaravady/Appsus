

export class MailFolderList extends React.Component {
    state = {
        filterBy: {
            isRead: 'all',
            isStarred: false,
            status: 'inbox'

        },
    }

    componentDidMount() {

    }

    changeFilter = ({ target }) => {
        const field = target.dataset.field
        console.log(target.dataset.value);
        const value = target.dataset.value
        let { isStarred } = this.state.filterBy
        if (isStarred) isStarred = !isStarred
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value, isStarred } }), () => {
            this.props.onSetFilter(this.state.filterBy)
            console.log(this.state.filterBy);
        })
    }

    changeIsStarred = () => {
        let { isStarred } = this.state.filterBy
        const { filterBy } = this.state
        console.log(isStarred);
        isStarred = true
        this.setState(({ filterBy: { ...filterBy, isStarred } }), () => {
            this.props.onSetFilter(this.state.filterBy)
            console.log(this.state.filterBy);
        })
    }

    render() {

        return (
            <section className="folder-list">
                <ul className="clean-list status-list">
                    <li data-value="inbox" data-field="status" onClick={this.changeFilter}>Inbox</li>
                    <li data-value={true} data-field='isStarred' onClick={this.changeIsStarred} > Starred</li>
                    <li data-value="sent" data-field="status" onClick={this.changeFilter}>Sent Mail</li>
                    <li data-value="draft" data-field="status" onClick={this.changeFilter}>Draft</li>
                </ul>
            </section >
        )
    }
}