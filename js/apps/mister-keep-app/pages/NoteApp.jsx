import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Loader } from '../../../cmps/Loader.jsx'

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
        selectedNote: null,
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
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

    onSelectNote = (note) => {
        console.log('onSelectNote', note);
        this.setState({ selectedNote: note })
    }

    onUnSelectNote = () => {
        this.setState({ selectedNote: null })
    }

    render() {
        const { notes, selectedNote } = this.state;
        return (
            <section>
                <NoteAdd loadNotes={this.loadNotes} />
                {/* <noteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} /> */}
                {!notes ? <Loader /> :
                    <NoteList
                        loadNotes={this.loadNotes}
                        notes={notes}
                        onSelectNote={this.onSelectNote}
                    />
                }
                {selectedNote && <NoteEdit />}


            </section>
        )
    }
}