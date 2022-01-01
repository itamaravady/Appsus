import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { Loader } from '../../../cmps/Loader.jsx'
import { eventBusService } from '../../../services/eventBusService.js'

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
        navClassList: '',
    }

    componentDidMount() {
        this.slowLoadNotes();
    }

    slowLoadNotes = () => {
        const { filterBy } = this.state;
        noteService.waitQuery(filterBy)
            // noteService.query(filterBy)
            .then(notes => {
                this.setState({ notes })
            })
    }
    loadNotes = () => {
        const { filterBy } = this.state;
        noteService.query(filterBy)
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onToggleNav = () => {
        if (!this.state.navClassList) return this.setState({ navClassList: 'open-nav' })
        return this.setState({ navClassList: '' })
    }

    render() {
        const { notes } = this.state;
        return (
            <section className='main-layout' >
                <NoteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} />
                <NoteAdd loadNotes={this.loadNotes} />

                {!notes ? <Loader /> :
                    <NoteList
                        loadNotes={this.loadNotes}
                        notes={notes}
                        isPinList={true}
                        toggleScreen={this.onToggleNav}
                    />
                }
                {!notes ? <div></div> :
                    <NoteList
                        loadNotes={this.loadNotes}
                        notes={notes}
                        isPinList={false}
                        toggleScreen={this.onToggleNav}
                    />
                }

                <div className={`toggle-details-screen ${this.state.navClassList}`} onClick={this.onToggleNav} ></div>

            </section>
        )
    }
}