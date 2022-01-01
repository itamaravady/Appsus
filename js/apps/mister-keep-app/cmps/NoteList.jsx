import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, loadNotes, isPinList, toggleScreen }) {
    if (!notes.length) return <div>No notes!</div>
    return (
        <section className="note-list">
            {notes.filter(note => note.isPinned === isPinList).map(note => {
                return <NotePreview toggleScreen={toggleScreen} key={note.id} note={note} loadNotes={loadNotes} />
            }
            )}

        </section>
    );
}