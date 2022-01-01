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
        this.setState({ note }, () => {
            if (this.state.note && this.props.parentNoteId === this.state.note.id) this.props.toggleScreen();
        })


    }

    setTodo = (todoId) => {
        const todoIdx = this.state.note.info.todos.findIndex(todo => todo.id === todoId);

        this.setState(prevState => {
            return {
                note: {
                    ...prevState.note, info: {
                        ...prevState.note.info, todos: (() => {
                            const modifiedTodos = prevState.note.info.todos.slice();
                            modifiedTodos[todoIdx].isDone = !modifiedTodos[todoIdx].isDone;
                            return modifiedTodos;
                        })()
                    }
                }
            }
        }, () => noteService.replaceNote(this.state.note)
            .then(this.props.onSetTodo(this.state.note)));

    }

    render() {
        const { note } = this.state;
        const { parentNoteId } = this.props;
        const { noteId } = this.props.match.params
        const isSelectedNote = note && parentNoteId === note.id;
        return (
            <div>{isSelectedNote &&
                <div style={{ backgroundColor: note.style.backgroundColor }} className="note-details-container">
                    <NavLink className="clean-link btn-close" to={`/note/`}>
                        <img className="btn-close" src="../../assets/svg/x.svg" />
                    </NavLink>
                    {note && <NoteForDisplay setTodo={this.setTodo} noteId={noteId} note={note} classes='note-details' />}
                </div>}
            </div>
        )
    }
}