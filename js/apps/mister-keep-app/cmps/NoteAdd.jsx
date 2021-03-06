import { noteService } from "../services/note.service.js"
import { eventBusService } from "../../../services/eventBusService.js"
import { utilService } from "../../../services/util.service.js";

export class NoteAdd extends React.Component {
    state = {
        inputTxt: '',
        noteType: 'txt',
        placeHolder: 'Type note...',
        note: null,
    }
    removeEventBus = null;

    componentDidMount() {
        this.removeEventBus = eventBusService.on('edit-note', (note) => {
            this.setState({ inputTxt: note.info.inputTxt, noteType: note.type, note: note });

        })
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    onChangeAddNoteType = ({ target }) => {
        this.setState({ noteType: target.name })
        switch (target.name) {
            case 'txt':
                this.setState({ placeHolder: 'Type note...' })
                break;
            case 'img':
                this.setState({ placeHolder: 'Insert image URL...' })
                break;
            case 'video':
                this.setState({ placeHolder: 'Insert video URL...' })
                break;
            case 'todos':
                this.setState({ placeHolder: 'Insert comma seperated list...' })
                break;
        }
    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value });
    }

    onBlur = () => {
        this.setState({
            inputTxt: '',
            noteType: 'txt',
            placeHolder: 'Type note...',
            note: null,
        });
    }

    submit = (ev) => {
        ev.preventDefault();
        const { inputTxt, noteType, note } = this.state;
        if (note) noteService.editNote(inputTxt, note)
            .then((note) => {
                eventBusService.emit('done-edit', note);
                this.onBlur();
            });
        else noteService.addNote(inputTxt, noteType)
            .then(() => {
                this.props.loadNotes();
                this.onBlur();
            });



    }

    render() {
        const { placeHolder, noteType, inputTxt } = this.state;
        // console.log(this.state.note);
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
                    <img src="assets/svg/note/txt.svg" className={`btn-note-add btn-note-add-txt  ${noteType === 'txt' && 'active'}`} onClick={this.onChangeAddNoteType} name="txt" />
                    <img src="assets/svg/note/image.svg" className={`btn-note-add btn-note-add-img ${noteType === 'img' && 'active'}`} onClick={this.onChangeAddNoteType} name="img" />
                    <img src="assets/svg/note/video.svg" className={`btn-note-add btn-note-add-video ${noteType === 'video' && 'active'}`} onClick={this.onChangeAddNoteType} name="video" />
                    <img src="assets/svg/note/todo.svg" className={`btn-note-add btn-note-add-todos ${noteType === 'todos' && 'active'}`} onClick={this.onChangeAddNoteType} name="todos" />
                </div>

            </section>

        )
    }
}