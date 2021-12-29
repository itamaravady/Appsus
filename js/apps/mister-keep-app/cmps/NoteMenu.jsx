export function NoteMenu(props) {
    const { note, onRemove } = props
    return (
        <button onClick={onRemove}>X</button>
    )
}