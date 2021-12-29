
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
// import { MailFilter } from '../cmps/MailFilter.jsx'
// import { MailAdd } from '../cmps/MailAdd.jsx'
// import { eventBusService } from '../../../services/eventBusService.js'

export class MailApp extends React.Component {

    state = {
        mails: [],
        fiterBy: {
            status: '',
            txt: '',
            isRead: false,
            isStared: false,
            lables: ''
        }
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

    // onAddBook = (selectedBook) => {
    //     console.log(selectedBook);
    //     mailService.addBook(selectedBook).then(() => {
    //         this.loadBooks()
    //         eventBusService.emit('user-msg', { text: 'Added book !', type: 'success' })
    //     }
    //     )
    // }

    // onSetFilter = (filterBy) => {
    //     this.setState({ filterBy }, this.loadBooks)
    // }

    render() {
        const { mails } = this.state
        console.log(mails);
        if (!mails) return
        return (
            <section className="mail-app">
                <MailList mails={mails} />
            </section>
        )
    }
}

