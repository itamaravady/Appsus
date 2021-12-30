import { noteService } from "../services/note.service.js";
const { NavLink, Route } = ReactRouterDOM;
import { NoteForDisplay } from './NoteForDisplay.jsx'

export class NoteDetails extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        console.log("did mount");
        this.loadNote();
    }

    loadNote = () => {
        console.log("did load");
        const { noteId } = this.props.match.params
        noteService.getNoteById(noteId)
            .then((note) => {
                this.setState({ note: note })
            })
    }
    render() {
        const { note } = this.state;
        console.log(note);

        return (
            <div className="note-details-container">
                <NavLink className="clean-link btn-close" to={`/note/`}>
                    X
                </NavLink>
                {note && <NoteForDisplay note={note} classes='note-details' />}
            </div>
        )
    }
}