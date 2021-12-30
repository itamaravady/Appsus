import { noteService } from "../services/note.service.js";
const { NavLink, Route } = ReactRouterDOM;
import { NoteForDisplay } from './NoteForDisplay.jsx'

export class NoteDetails extends React.Component {
    state = {
        note: null
    }

    componentDidMount() {
        this.loadNote();
    }

    loadNote = () => {
        const { noteId } = this.props.match.params
        const note = noteService.getNoteById(noteId);
        this.setState({ note })

    }
    render() {
        const { note } = this.state;

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