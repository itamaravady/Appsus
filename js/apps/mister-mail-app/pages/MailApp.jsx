
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailDetails } from './MailDetails.jsx'

const { Link, Route, Switch } = ReactRouterDOM;


export class MailApp extends React.Component {

    state = {
        mails: [],
        filterBy: {
            status: 'inbox',
        },
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
        this.props.history.push('/mail')
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

    onRemoveMail = (mailId) => {
        mailService.remove(mailId)
            .then(() => this.loadMails())
    }

    render() {
        const { mails } = this.state
        if (!mails) return
        return (
            <section className="mail-app">
                <MailFilter onSetFilter={this.onSetFilter} />
                <div className="side-by-side">
                    <div className="side-folder">
                        <Link className="compose-btn clean-link" to="/mail/compose"> <span>+</span> Compose</Link>
                        <MailFolderList onSetFilter={this.onSetFilter} />
                    </div>
                    <React.Fragment>
                        <Switch>
                            <Route render={(props) => <MailDetails loadMails={this.loadMails} {...props} />} path="/mail/:mailId" />
                        <Route render={(props) => <MailList mails={mails} onAddStar={this.onAddStar} onToggleComposeModal={this.onToggleComposeModal} {...props} />} path="/mail" />
                        </Switch>
                    </React.Fragment>
                            <Route render={(props) => <MailCompose onToggleComposeModal={this.onToggleComposeModal} onAddMail={this.onAddMail} onRemoveMail = {this.onRemoveMail} {...props} />} path="/mail/compose/:mailId?" />
                    {/* <MailList mails={mails} onAddStar={this.onAddStar} onToggleComposeModal={this.onToggleComposeModal} /> */}

                </div>
            </section>
        )
    }
}

// /* <div>
//     <Link className="compose-btn clean-link" to="/mail/compose"> <span>+</span> Compose</Link>
//     <MailFolderList onSetFilter={this.onSetFilter} />
// </div>
// <div>
//     <Switch>
//         <Route component={MailDetails} path="/mail/:mailId" />
//         <Route render={(props) => <MailList mails={mails} onAddStar={this.onAddStar} onToggleComposeModal={this.onToggleComposeModal} {...props} />} path="/mail" />
//     </Switch>
// </div>
// <Route render={(props) => <MailCompose onToggleComposeModal={this.onToggleComposeModal} onAddMail={this.onAddMail} {...props} />} path="/mail/compose/:mailId?" />