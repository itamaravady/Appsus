import { Loader } from '../../../cmps/Loader.jsx';
import { eventBusService } from '../../../services/eventBusService.js'
import { mailService } from '../services/mail.service.js';


const { Link, withRouter } = ReactRouterDOM;


class _MailCompose extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
        }
    }

    componentDidMount() {
        this.loadDraft()
        console.log(this.props);

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
        this.setState((prevState) => ({ mail: { ...prevState.mail, ['status']: 'sent' } }), () => {
            this.props.onAddMail(this.state.mail)
            eventBusService.emit('user-msg', { txt: 'Sent Mail !', type: this.state.mail, name: 'mail' })
        })
    }

    saveDraft = () => {
        if (this.state.mail.status) return this.props.onToggleComposeModal()
        this.setState((prevState) => ({ mail: { ...prevState.mail, ['status']: 'draft' } }), () => {
            this.props.onAddMail(this.state.mail)
        })

    }

    loadDraft = () => {
        let urlParams = new URLSearchParams(this.props.location.search);
        const mailId = urlParams.get("mailId")
        if (!mailId) return false
        mailService.getById(mailId)
            .then(mail => {
                this.setState({ mail })
            })
    }

    onRemove = () => {
        const { id: mailId } = this.state.mail
        console.log(mailId);
        if (mailId) this.props.onRemoveMail(mailId)
        this.props.onToggleComposeModal()
    }

    render() {
        const { to, subject, body } = this.state.mail
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
                        <Link to="/mail" onClick={this.submit}>Send</Link>
                        <img onClick={this.onRemove} src="assets/img/email-img/trash.png" />
                    </div>
                </form>
            </section>
        )
    }
}


export const MailCompose = withRouter(_MailCompose)
