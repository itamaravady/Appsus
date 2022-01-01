
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
        isShowComposeModal: false,
        navClassList: ''
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
        this.setState({ isShowComposeModal: !this.state.isShowComposeModal })
        // this.props.history.push('/mail')
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

    onToggleNav = () => {
        if (!this.state.navClassList) return this.setState({ navClassList: 'open-nav' })
        return this.setState({ navClassList: '' })
    }

    render() {
        const { mails, isShowComposeModal, navClassList } = this.state
        if (!mails) return
        return (
            <section className="mail-app main-layout">
                <MailFilter onSetFilter={this.onSetFilter} onToggleNav={this.onToggleNav} />
                <Link className="short-compose clean-link" onClick={this.onToggleComposeModal} to={'/mail'} > <span className="short-view">+</span></Link>
                <div className="side-by-side">
                    <div className={`side-folder ${navClassList}`}>
                        <Link className="compose-btn clean-link" onClick={this.onToggleComposeModal} to={'/mail'} > <span className="full-view">+ Compose </span></Link>
                        <MailFolderList onSetFilter={this.onSetFilter} navClassList={navClassList} />
                    </div>
                    <React.Fragment>
                        <Switch>
                            <Route render={(props) => <MailDetails loadMails={this.loadMails} {...props} />} path="/mail/:mailId" />
                            <Route render={(props) => <MailList mails={mails} onAddStar={this.onAddStar} onToggleComposeModal={this.onToggleComposeModal} loadMails={this.loadMails} {...props} />} path="/mail" />
                        </Switch>
                    </React.Fragment>
                    {isShowComposeModal && <MailCompose onToggleComposeModal={this.onToggleComposeModal} onAddMail={this.onAddMail} onRemoveMail={this.onRemoveMail} />}
                </div>
                    <div className={`toggle-menu-screen ${navClassList}`} onClick={this.onToggleNav} alt="toggle main menu"></div>
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