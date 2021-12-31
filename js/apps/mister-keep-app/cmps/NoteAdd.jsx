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

    onBlur = () => {
        this.setState({
            inputTxt: '',
            noteType: 'txt',
            placeHolder: 'Type note...',
            noteId: null,
        });
    }

    submit = (ev) => {
        ev.preventDefault();
        const { inputTxt: inputTxt, noteType, noteId } = this.state;
        noteService.addNote(inputTxt, noteType, noteId)
            .then((note) => {

                if (note) eventBusService.emit('done-edit', note);
                else this.props.loadNotes();
                this.onBlur();
            });
    }

    render() {
        const { placeHolder, noteType, inputTxt } = this.state;
        return (

            <section className="note-add">
                <form onSubmit={this.submit}>
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder={placeHolder}
                        className="add-input"
                        name="inputTxt"
                        onChange={this.handleChange}
                        onBlur={this.onBlur}
                        value={inputTxt} />
                </form>
                <div className="note-add-menu">
                    <img src="/assets/svg/note/txt.svg" className={`btn-note-add btn-note-add-txt  ${noteType === 'txt' && 'active'}`} onClick={this.onChangeAddNoteType} name="txt" />
                    <img src="/assets/svg/note/image.svg" className={`btn-note-add btn-note-add-img ${noteType === 'img' && 'active'}`} onClick={this.onChangeAddNoteType} name="img" />
                    <img src="/assets/svg/note/video.svg" className={`btn-note-add btn-note-add-video ${noteType === 'video' && 'active'}`} onClick={this.onChangeAddNoteType} name="video" />
                    <img src="/assets/svg/note/todo.svg" className={`btn-note-add btn-note-add-todos ${noteType === 'todos' && 'active'}`} onClick={this.onChangeAddNoteType} name="todos" />
                </div>

            </section>

        )
    }
}