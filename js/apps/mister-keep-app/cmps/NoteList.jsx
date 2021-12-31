import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, loadNotes }) {
    if (!notes.length) return <div>No notes!</div>
    return (
        <section className="note-list main-layout">
            {notes.map(note => {
                return <NotePreview key={note.id} note={note} loadNotes={loadNotes} />
            }
            )}
        </section>
    );
}