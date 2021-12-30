export function NoteMenu({ onEdit, onRemove, classes }) {
    // const { note, onRemove, classes } = props
    return (
        <div className={classes}>
            <button onClick={onRemove}>X</button>
            <button onClick={onEdit}>Edit</button>
        </div>
    )
}