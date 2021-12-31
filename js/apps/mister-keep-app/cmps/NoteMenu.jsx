export function NoteMenu({ onEdit, onRemove, classes }) {
    // const { note, onRemove, classes } = props
    return (
        <div className={classes}>
            <img className="btn-note-remove" src="../../../assets/svg/trash-bin.svg" onClick={onRemove} />
            <img className="btn-note-edit" src="../../../assets/svg/note/edit.svg" onClick={onEdit} />
            <img className="btn-note-bgc" src="../../../assets/svg/note/color-palette.svg" onClick={onEdit} />
        </div>
    )
}