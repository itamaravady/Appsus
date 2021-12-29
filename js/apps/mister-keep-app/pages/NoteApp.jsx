import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { Loader } from '../../../cmps/Loader.jsx'

export class NoteApp extends React.Component {

    state = {
        notes: null,
        filterBy: null,
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

    // onSelectNote = (note) => {
    //     this.setState({ selectedNote: note })
    // }

    // onUnSelectNote = () => {
    //     this.setState({ selectedNote: null })
    // }

    render() {
        const notesToShow = this.state.notes;
        return (
            <section>
                {/* <noteAdd history={this.props.history} /> */}
                {/* <noteFilter filterBy={this.state.filterBy} onSetFilter={this.onSetFilter} /> */}
                {!notesToShow ? <Loader /> : <NoteList loadNotes={this.loadNotes} notes={notesToShow} />}


            </section>
        )
    }
}