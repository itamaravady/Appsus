import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/eventBusService.js"
import { utilService } from "../../../services/util.service.js";

export class NoteAdd extends React.Component {
    state = {
        inputTxt: '',
        noteType: 'txt',
        placeHolder: 'Type note...',
        noteId: null,
    }
    removeEventBus = null;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('edit-note', (note) => {
            this.setState({ inputTxt: note.info.inputTxt, noteType: note.type, noteId: note.id, });
        })
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onChangeAddNoteType = ({ target }) => {
        this.setState({ noteType: target.name })
    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value });
    }

    submit = (ev) => {
        ev.preventDefault();
        const { inputTxt: inputTxt, noteType, noteId } = this.state;
        noteService.addNote(inputTxt, noteType, noteId)
            .then((note) => {

                if (note) eventBusService.emit('done-edit', note);
                else this.props.loadNotes();
                this.setState({
                    inputTxt: '',
                    noteType: 'txt',
                    placeHolder: 'Type note...',
                    noteId: null,
                });

            });
    }

    render() {
        const { placeHolder, noteType, inputTxt } = this.state;
        return (

            <section className="note-add">
                <form onSubmit={this.submit}>
                    <input type="text" autoComplete="off" placeholder={placeHolder} className="add-input" name="inputTxt" onChange={this.handleChange} value={inputTxt} />
                </form>
                <div className="note-add-menu">
                    <button className={`note-add-btn ${noteType === 'txt' && 'active'}`} onClick={this.onChangeAddNoteType} name="txt">text</button>
                    <button className={`note-add-btn ${noteType === 'img' && 'active'}`} onClick={this.onChangeAddNoteType} name="img">image</button>
                    <button className={`note-add-btn ${noteType === 'video' && 'active'}`} onClick={this.onChangeAddNoteType} name="video">video</button>
                    <button className={`note-add-btn ${noteType === 'todos' && 'active'}`} onClick={this.onChangeAddNoteType} name="todos">list</button>
                </div>

            </section>

        )
    }
}