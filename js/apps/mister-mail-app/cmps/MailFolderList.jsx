

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
        const value = target.dataset.value
        let { isStarred } = this.state.filterBy
        if (isStarred) isStarred = !isStarred
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value, isStarred } }), () => {
            this.props.onSetFilter(this.state.filterBy)
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
                    <div className="li-img-container">
                        <img src="assets/img/email-img/inbox.png" />
                        <li data-value="inbox" data-field="status" onClick={this.changeFilter}>Inbox</li>
                    </div>
                    <div className="li-img-container">
                        <img src="assets/img/email-img/star.png" />
                        <li data-value={true} data-field='isStarred' onClick={this.changeIsStarred} > Starred</li>
                    </div>
                    <div className="li-img-container">
                        <img src="assets/img/email-img/sent.png" />
                        <li data-value="sent" data-field="status" onClick={this.changeFilter}>Sent Mail</li>
                    </div>
                    <div className="li-img-container">
                        <img src="assets/img/email-img/draft.png" />
                        <li data-value="draft" data-field="status" onClick={this.changeFilter}>Draft</li>
                    </div>
                </ul>
            </section >
        )
    }
}