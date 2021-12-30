import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, loadNotes, onEdit }) {
    if (!notes.length) return <div>No notes!</div>
    return (
        <section className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note} loadNotes={loadNotes} onEdit={() => onEdit(note)} />)}
        </section>
    );
}