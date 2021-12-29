import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    if (!notes.length) return <div>No notes!</div>
    return (
        <section className="note-list">
            {notes.map(note => <NotePreview key={note.id} note={note} />)}
            {/* {notes.map(note => <div>note</div>)} */}
        </section>
    );
}