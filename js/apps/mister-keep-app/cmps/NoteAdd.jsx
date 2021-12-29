import { noteService } from "../services/note.service.js"

export class NoteAdd extends React.Component {
    state = {
        inputText: '',
        noteType: 'txt',
        placeHolder: 'Type note...',
    }

    onChangeAddNoteType = ({ target }) => {
        this.setState({ noteType: target.name })
    }

    handleChange = ({ target }) => {
        this.setState({ inputText: target.value });
    }

    submit = (ev) => {
        ev.preventDefault();
        const { inputText, noteType } = this.state;
        noteService.addNote(inputText, noteType)
            .then(this.props.loadNotes());
    }

    render() {
        const { placeHolder, noteType } = this.state;

        return (

            <section className="note-add">
                <form onSubmit={this.submit}>
                    <input type="text" autoComplete="off" placeholder={placeHolder} className="add-input" name="inputText" onChange={this.handleChange} value={this.state.inputText} />
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