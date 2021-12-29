
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
// import { MailAdd } from '../cmps/MailAdd.jsx'
// import { eventBusService } from '../../../services/eventBusService.js'

// const { Link, Route } = ReactRouterDOM;


export class MailApp extends React.Component {

    state = {
        mails: [],
        fiterBy: null,
        isShowComposeModal: false
    }

    componentDidMount() {
        this.loadBooks()
    }


    loadBooks = () => {
        const { filterBy } = this.state
        mailService.query(filterBy).then(mails => {
            this.setState({ mails })
        })
    }

    onToggleComposeModal = () => {
        this.setState({ isShowComposeModal: !this.state.isShowComposeModal });
    };

    // onAddBook = (selectedBook) => {
    //     console.log(selectedBook);
    //     mailService.addBook(selectedBook).then(() => {
    //         this.loadBooks()
    //         eventBusService.emit('user-msg', { text: 'Added book !', type: 'success' })
    //     }
    //     )
    // }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
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
                    {isShowComposeModal && <MailCompose onToggleComposeModal={this.onToggleComposeModal}/>}
                    </div>
                    <MailList mails={mails} />
                </div>
            </section>
        )
    }
}

