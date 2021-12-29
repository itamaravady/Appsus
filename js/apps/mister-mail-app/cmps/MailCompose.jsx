import { eventBusService } from '../../../services/eventBusService.js'


export class MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? +target.value : target.value
        if (value === 'true') value = true
        if (value === 'false') value = false
        this.setState((prevState) => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    submit = (ev) => {
        ev.preventDefault()
        this.setState((prevState) => ({ mail: { ...prevState.mail, ['isSend']: true, ['isDraft']: false } }), () => {
            this.props.onAddMail(this.state.mail)
            eventBusService.emit('user-msg', { txt: 'Sent Mail !', type: this.state.mail, name: 'mail' })
        })
    }

    saveDraft = () => {
        this.setState((prevState) => ({ mail: { ...prevState.mail, ['isSend']: false, ['isDraft']: true } }), () => {
            this.props.onAddMail(this.state.mail)
        })
    }

    render() {
        const { to, subject, body } = this.state
        return (
            <section className="mail-compose-section">
                <header className="new-mail-header">
                    <h5>New Message</h5>
                    <span onClick={this.saveDraft}>x</span>
                </header>
                <form onSubmit={this.submit} className="new-mail-form">
                    <label>Send to:
                        <input type="text" name="to" value={to} onChange={this.handleChange} />
                    </label>
                    <label>Subject:
                        <input type="text" name="subject" value={subject} onChange={this.handleChange} />
                    </label>
                    <textarea name="body" value={body} onChange={this.handleChange}></textarea>
                    <div className="options-new-mail">
                        <button type="submit">Send</button>
                        <img onClick={this.props.onToggleComposeModal} src="assets/img/email-img/trash.png" />
                    </div>
                </form>
            </section>
        )
    }
}