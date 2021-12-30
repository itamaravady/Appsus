import { TodosPreview } from './TodosPreview.jsx'
import { noteService } from '../services/note.service.js'
import { NoteMenu } from './NoteMenu.jsx'
import { NoteDetails } from './NoteDetails.jsx'
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
        const { note, isMenuHover } = this.state;
        const { onEdit } = this.props

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
                    onEdit={onEdit}
                />
            </article >

        )
    }
}

