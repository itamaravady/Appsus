export function NoteMenu(props) {
    const { note, onRemove, classes } = props
    return (
        <div className={classes}>
            <button onClick={onRemove}>X</button>
        </div>
    )
}