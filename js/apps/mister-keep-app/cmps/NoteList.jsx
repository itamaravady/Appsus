import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, loadNotes, isPinList }) {
    if (!notes.length) return <div>No notes!</div>

    return (
        <section className="note-list main-layout">
            {notes.filter(note => note.isPinned === isPinList).map(note => {
                return <NotePreview key={note.id} note={note} loadNotes={loadNotes} />
            }
            )}

        </section>
    );
}