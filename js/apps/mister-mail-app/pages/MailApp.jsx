
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'

// const { Link, Route } = ReactRouterDOM;


export class MailApp extends React.Component {

    state = {
        mails: [],
        filterBy: {
            status: 'inbox',
        },
        isShowComposeModal: false
    }

    componentDidMount() {
        this.loadMails()
    }


    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy).then(mails => {
            this.setState({ mails })
        })
    }

    onToggleComposeModal = () => {
        this.setState({ isShowComposeModal: !this.state.isShowComposeModal });
    };

    onAddMail = (mail) => {
        mailService.addMail(mail).then(() => {
            this.loadMails()
            this.onToggleComposeModal()
        }
        )
    }

    onSetFilter = (filterBy) => {
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, ...filterBy } }), this.loadMails)
    }

    onAddStar = (mailId) => {
        mailService.addStar(mailId)
            .then(() => this.loadMails())
    }

    render() {
        const { mails, isShowComposeModal } = this.state
        if (!mails) return
        return (
            <section className="mail-app">
                <MailFilter onSetFilter={this.onSetFilter} />
                <div className="side-by-side">
                    <div className="compose-container">
                        <button className="compose-btn" onClick={this.onToggleComposeModal}> <span>+</span> Compose</button>
                        {isShowComposeModal && <MailCompose onToggleComposeModal={this.onToggleComposeModal} onAddMail={this.onAddMail} />}
                        <MailFolderList onSetFilter={this.onSetFilter} />
                    </div>
                    <MailList mails={mails} onAddStar={this.onAddStar} />
                </div>
            </section>
        )
    }
}

