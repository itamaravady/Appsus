import { TodosPreview } from './TodosPreview.jsx'
import { MailsPreview } from './MailsPreview.jsx'

export function NoteForDisplay({ note, classes, setTodo, noteId }) {
    const { info } = note
    return (
        <div className={classes}>
            {info.label && <h4 className="label">{info.label}</h4>}
            {info.title && <h3 className="note-title">{info.title}</h3>}
            {info.txt && <p className="note-txt">{info.txt}</p>}
            {info.img && <div className="note-img-container"><img src={info.img} alt="image not found :/" /></div>}
            {
                info.video && (
                    <video className="note-video" width="150" controls>
                        <source src={info.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )
            }
            {info.todos && <TodosPreview noteId={noteId} setTodo={setTodo} todos={info.todos} />}
            {info.mail && <MailsPreview mail={info.mail} />}
        </div>
    )
}
