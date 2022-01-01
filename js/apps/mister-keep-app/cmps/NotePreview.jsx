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
        isColorMenuOpen: false,
    }

    removeEventBus = null;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('done-edit', (note) => {
            if (note.id === this.state.note.id) this.setState({ note })
            this.props.loadNotes();
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
        eventBusService.emit('edit-note', note)
        // console.log(note);
    }

    onDuplicate = () => {
        noteService.duplicateNote(this.state.note)
            .then(() => {
                this.props.loadNotes();
            });
    }

    onSetStyle = (newStyle) => {
        var { style, id } = this.state.note;
        style = { ...style, ...newStyle };
        noteService.setNoteStyle(id, style)
            .then(() => {
                var note = this.state.note;
                note.style = style;
                this.setState({ note })
            });
    }

    toggleMenuBtns = (action) => {
        if (action === 'hide') {
            this.setState({ isMenuHover: false, isColorMenuOpen: false });
        }
        else this.setState({ isMenuHover: true });
    }

    toggleColorMenu = () => {
        this.setState({ isColorMenuOpen: !this.state.isColorMenuOpen });
    }

    getIsColorMenuOpen = () => this.state.isColorMenuOpen

    onSetTodo = (note) => {
        this.setState({ note });
    }

    onPinned = () => {
        this.setState((prevState) => ({ note: { ...prevState.note, isPinned: !prevState.note.isPinned } })
            , () => noteService.replaceNote(this.state.note)
                .then(this.props.loadNotes()));
    }

    render() {
        const { note, isMenuHover } = this.state;

        return (
            <article
                className={`note-preview-container `}
                onMouseEnter={this.toggleMenuBtns}
                onMouseLeave={() => this.toggleMenuBtns('hide')}
                style={{ backgroundColor: this.state.note.style.backgroundColor }}
            >
                <Route render={(props) => (<NoteDetails {...props} toggleScreen={this.props.toggleScreen} onSetTodo={this.onSetTodo} parentNoteId={note.id} />)} path="/note/:noteId" />
                <NavLink className="clean-link" to={`/note/${note.id}`}>
                    <NoteForDisplay note={note} classes="note-preview" />
                </NavLink>
                <NoteMenu
                    menuClasses={`note-menu ${isMenuHover && 'open'}`}
                    onRemove={this.onRemove}
                    onEdit={() => this.onEdit(note)}
                    onDuplicate={this.onDuplicate}
                    onSetStyle={this.onSetStyle}
                    toggleColorMenu={this.toggleColorMenu}
                    getIsColorMenuOpen={this.getIsColorMenuOpen}
                    onPinned={this.onPinned}
                    pinClasses={note.isPinned && 'active'}
                />
            </article >

        )
    }
}

