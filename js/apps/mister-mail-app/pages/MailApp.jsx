
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
// import { MailAdd } from '../cmps/MailAdd.jsx'

// const { Link, Route } = ReactRouterDOM;


export class MailApp extends React.Component {

    state = {
        mails: [],
        fiterBy: null,
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
        console.log(mail);
        mailService.addMail(mail).then(() => {
            this.loadMails()
            this.onToggleComposeModal()
        }
        )
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
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
                        {/* <MailFolderList /> */}
                    </div>
                    <MailList mails={mails} />
                </div>
            </section>
        )
    }
}

