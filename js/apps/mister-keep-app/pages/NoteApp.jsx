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
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        console.log('load notes!');
        const { filterBy } = this.state;
        noteService.waitQuery(filterBy)
            // noteService.query(filterBy)
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onEdit = (note) => {
        eventBusService.emit('edit-note', note)
    }

    render() {
        const { notes } = this.state;
        return (
            <section>
                <NoteAdd loadNotes={this.loadNotes} />
                {/* <noteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} /> */}
                {!notes ? <Loader /> :
                    <NoteList
                        onEdit={this.onEdit}
                        loadNotes={this.loadNotes}
                        notes={notes}
                    />
                }



            </section>
        )
    }
}