import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    waitQuery,
    query,
    removeNote,
    addNote,
    editNote,
    replaceNote,
    getNoteById,
    setNoteStyle,
    duplicateNote,
    addMailToNotes,
}

const KEY = 'noteDB';
_createNotes();


function _createNotes() {
    var notes = _loadNotesFromStorage(KEY);
    //should notes.length still be here
    if (!notes || !notes.length) {

        notes = ([
            {
                id: utilService.makeId(),
                type: 'txt',
                isPinned: false,
                info: {
                    inputTxt: 'js is red, vue is blue, css is green and I love React.',
                    txt: 'js is red, vue is blue, css is green and I love React.',
                },
                style: {
                    backgroundColor: '#fff',
                    font: 'ariel',
                }
            },
            {
                id: utilService.makeId(),
                type: 'img',
                isPinned: true,
                info: {
                    inputTxt: 'https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg',
                    img: 'https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg',
                },
                style: {
                    backgroundColor: '#61e8e1',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'video',
                isPinned: true,
                info: {
                    inputTxt: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                },
                style: {
                    backgroundColor: '#f25757',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'todos',
                isPinned: false,
                info: {
                    inputTxt: 'buy bananas,get a haircut',
                    label: 'Personal',
                    todos: [
                        { id: utilService.makeId(), todo: 'buy bananas', isDone: true }, { id: utilService.makeId(), todo: 'get a haircut', isDone: false },
                    ],
                },
                style: {
                    backgroundColor: '#f2e863',
                    font: 'impact',
                }
            },
        ]);
        _saveNotesToStorage(notes);
    }
}

function query(filterBy = null) {
    const notes = _loadNotesFromStorage();
    if (!filterBy) return Promise.resolve(notes);
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    return Promise.resolve(filteredNotes);
}

function waitQuery(filterBy = null) {
    const notes = _loadNotesFromStorage();

    if (!filterBy) {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500, notes);
        });
    }
    const filteredNotes = _getFilteredNotes(notes, filterBy)
    return new Promise((resolve) => {
        setTimeout(resolve, 1500, filteredNotes);
    });
}






function addNote(inputText, noteType) {
    var notes = _loadNotesFromStorage();
    var note = {
        id: utilService.makeId(),
        type: noteType,
        isPinned: false,
        info: {
            inputTxt: inputText,
            [noteType]: inputText
        },
        style: {
            backgroundColor: '#fff',
            font: 'ariel',
        },
    }
    if (noteType === 'todos') note.info.todos = _formatTodos(inputText);
    notes.push(note);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}


function editNote(inputTxt, note) {
    // console.log(inputTxt, note);
    const notes = _loadNotesFromStorage();

    const duplicateNote = JSON.parse(JSON.stringify(note))
    duplicateNote.info = { ...duplicateNote.info, [duplicateNote.type]: inputTxt, inputTxt: inputTxt }
    if (duplicateNote.type === 'todos') {
        console.log(duplicateNote.type);
        const todos = _formatTodos(inputTxt);
        duplicateNote.info.todos = todos;
        console.log(duplicateNote);
        // duplicateNote.info = { ...duplicateNote.info, [noteType]: todos, inputTxt: inputTxt }
    }

    const noteIdx = notes.findIndex(note => note.id === duplicateNote.id)
    notes.splice(noteIdx, 1, duplicateNote);
    _saveNotesToStorage(notes);
    return Promise.resolve(duplicateNote);//?
}
function replaceNote(note) {
    const notes = _loadNotesFromStorage();
    const noteIdx = notes.findIndex(currNote => currNote.id === note.id);
    notes.splice(noteIdx, 1, note);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}



function _formatTodos(todos) {
    todos = todos.trim();
    todos = todos.split(',').map(todo => (todo.trim()))
    todos = todos.map(todo => ({ id: utilService.makeId(), todo, isDone: false }));
    return todos;
}

function duplicateNote(note) {
    var notes = _loadNotesFromStorage();
    const duplicateNote = JSON.parse(JSON.stringify(note))
    duplicateNote.id = utilService.makeId();
    notes.push(duplicateNote);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}

function setNoteStyle(noteId, newStyle) {
    var notes = _loadNotesFromStorage();
    const noteIdx = _getNoteIndexById(noteId);
    for (var styleType in newStyle) {
        notes[noteIdx].style = { ...notes[noteIdx].style, [styleType]: newStyle[styleType] }
    }
    _saveNotesToStorage(notes);
    return Promise.resolve()
}



function removeNote(noteId) {
    const noteIdxToRemove = _getNoteIndexById(noteId);
    var notes = _loadNotesFromStorage();
    notes.splice(noteIdxToRemove, 1);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}

function _getNoteIndexById(noteId) {
    var notes = _loadNotesFromStorage();
    return notes.findIndex(note => note.id === noteId);
}

function _getFilteredNotes(notes, filterBy) {
    //todo!
    return notes
}

function getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    // return new Promise.Resolve(notes.find(book => book.id === bookId));
    const note = notes.find(note => note.id === noteId);
    return note;
}

function addMailToNotes(mail) {
    console.log(mail);
    let notes = _loadNotesFromStorage(KEY) || [];
    //should notes.length still be here

    const mailToNote =
    {
        id: utilService.makeId(),
        type: 'mail',
        isPinned: false,
        info: {
            inputTxt: `From ${mail.from}: <${mail.fromMail}>,${mail.subject},${mail.body}`,
            label: 'Mail',
            mail: `From ${mail.from}: <${mail.fromMail}>,Title: ${mail.subject} ,Body: ${mail.body}`,
        },
        style: {
            backgroundColor: '#fff',
            font: 'arial',
        }
    }

    notes = [mailToNote, ...notes]
    _saveNotesToStorage(notes);

    return Promise.resolve()

}

function _saveNotesToStorage(notes) {
    // console.log(notes);
    storageService.save(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.load(KEY);
}