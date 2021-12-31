import { TodosPreview } from './TodosPreview.jsx'

export function NoteForDisplay({ note, classes }) {
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
            {info.todos && <TodosPreview todos={info.todos} />}
        </div>
    )
}
