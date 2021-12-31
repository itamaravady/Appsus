
const { NavLink } = ReactRouterDOM;



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
                    
                    <div className={`li-img-container`}>
                        <img src="assets/img/email-img/inbox.png" />
                        <NavLink className="clean-link" to="/mail" data-value="inbox" data-field="status" onClick={this.changeFilter}>Inbox</NavLink>
                    </div>
                    <div className={`li-img-container`}>
                        <img src="assets/img/email-img/star.png" />
                        <NavLink  className="clean-link" to="/mail" data-value={true} data-field='isStarred' onClick={this.changeIsStarred} > Starred</NavLink>
                    </div>
                    <div className={`li-img-container`}>
                        <img src="assets/img/email-img/sent.png" />
                        <NavLink className="clean-link" to="/mail" data-value="sent" data-field="status" onClick={this.changeFilter}>Sent Mail</NavLink>
                    </div>
                    <div className={`li-img-container`}>
                        <img src="assets/img/email-img/draft.png" />
                        <NavLink className="clean-link" to="/mail" data-value="draft" data-field="status" onClick={this.changeFilter}>Draft</NavLink>
                    </div>
                </ul>
            </section >
        )
    }
}