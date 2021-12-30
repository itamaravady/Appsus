import { TodosPreview } from './TodosPreview.jsx'
import { noteService } from '../services/note.service.js'
import { NoteMenu } from './NoteMenu.jsx'
import { NoteDetails } from './NoteDetails.jsx'
import { NoteForDisplay } from './NoteForDisplay.jsx'
import { eventBusService } from '../../../services/eventBusService.js'


const { NavLink, Route } = ReactRouterDOM;

export class NotePreview extends React.Component {
    state = {
        note: this.props.note,
        classes: null,
        isMenuHover: false,
    }

    removeEventBus = null;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('done-edit', (note) => {
            if (note.id === this.state.note.id) this.setState({ note })
        })
    }


    componentWillUnmount() {
        this.removeEventBus();
    }


    onRemove = () => {
        noteService.removeNote(this.state.note.id)
            .then(() => {
                this.props.loadNotes();
            });
    }

    onEdit = (note) => {
        console.log('on edit', note);
        eventBusService.emit('edit-note', note)
    }

    toggleMenuBtns = () => {
        this.setState({ isMenuHover: !this.state.isMenuHover })
    }

    render() {
        const { note, isMenuHover } = this.state;


        return (
            <article
                className={`note-preview-container `}
                onMouseEnter={this.toggleMenuBtns}
                onMouseLeave={this.toggleMenuBtns}
            >
                <Route component={NoteDetails} path="/note/:noteId" />
                <NavLink className="clean-link" to={`/note/${note.id}`}>
                    <NoteForDisplay note={note} classes="note-preview" />
                </NavLink>
                <NoteMenu
                    classes={`note-menu ${isMenuHover && 'open'}`}
                    note={note}//?
                    onRemove={this.onRemove}
                    onEdit={() => this.onEdit(note)}
                />
            </article >

        )
    }
}

