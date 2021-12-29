

export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        if (value === 'true') value = true
        if (value === 'false') value = false
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            // this.props.onSetFilter(this.state.filterBy)
        })
    }

    onSubmitFilter = (ev) => {
        ev.preventDefault()
        // this.props.onSetFilter(this.state.filterBy)
        this.cleanForm()
    }

    render() {
        const { to, subject, body } = this.state
        return (
            <section className="mail-compose-section">
                <header className="new-mail-header">
                    <h5>New Message</h5>
                    <span onClick={this.props.onToggleComposeModal}>x</span>
                </header>
                <form className="new-mail-form">
                    <label>Send to:
                        <input type="text" name="to" value={to} onChange={this.handleChange} />
                    </label>
                    <label>Subject:
                        <input type="text" name="subject" value={subject} onChange={this.handleChange} />
                    </label>
                        <textarea name="body" cols="60" rows="15" value={body} onChange={this.handleChange}></textarea>
                    <div className="options-new-mail">
                    <button type="submit">Send</button>
                    <img src="assets/img/email-img/trash.png"/>
                    </div>
                </form>
            </section>
        )
    }
}