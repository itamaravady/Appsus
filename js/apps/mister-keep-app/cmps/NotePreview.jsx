import { TodosPreview } from './TodosPreview.jsx'
import { noteService } from '../services/note.service.js'
import { NoteMenu } from './NoteMenu.jsx'
import { NoteEdit } from './NoteEdit.jsx'
import { NoteForDisplay } from './NoteForDisplay.jsx'


const { NavLink, Route } = ReactRouterDOM;

export class NotePreview extends React.Component {
    state = {
        note: this.props.note,
        classes: null,
        isMenuHover: false,
    }

    onRemove = () => {
        noteService.removeNote(this.state.note.id)
            .then(() => {
                this.props.loadNotes();
            });
    }

    toggleMenuBtns = () => {
        this.setState({ isMenuHover: !this.state.isMenuHover })
    }

    render() {
        const { note, classes, isMenuHover } = this.state;


        return (
            <article
                className={`note-preview-container ${classes}`}
                onMouseEnter={this.toggleMenuBtns}
                onMouseLeave={this.toggleMenuBtns}

            >
                <Route component={NoteEdit} path="/note/:noteId" />
                <NavLink className="clean-link" to={`/note/${note.id}`}>
                    <NoteForDisplay note={note} classes="note-preview" />
                </NavLink>
                <NoteMenu
                    classes={`note-menu ${isMenuHover && 'open'}`}
                    note={note}//?
                    onRemove={this.onRemove} />
            </article >

        )
    }
}

