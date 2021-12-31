import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    waitQuery,
    query,
    removeNote,
    addNote,
    getNoteById,
    setNoteStyle,
    duplicateNote,
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
                    todos: 'buy bananas,get a haircut',
                },
                style: {
                    backgroundColor: '#f2e863',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'todos',
                isPinned: false,
                info: {
                    inputTxt: 'buy tomatoes,delete me',
                    label: 'Personal',
                    todos: 'buy tomatoes,delete me',
                },
                style: {
                    backgroundColor: '#f2cd60',
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

function addNote(inputText, noteType, noteId) {
    var notes = _loadNotesFromStorage();
    if (noteId) {
        var note = notes.find(note => note.id === noteId)

        note.info = { ...note.info, [noteType]: inputText, inputTxt: inputText }

        const noteIdx = notes.findIndex(note => note.id === noteId)
        notes.splice(noteIdx, 1, note);
        _saveNotesToStorage(notes);
        return Promise.resolve(note);
    } else {

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
        notes.push(note);
        _saveNotesToStorage(notes);
        return Promise.resolve();
    }
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

function _saveNotesToStorage(notes) {
    storageService.save(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.load(KEY);
}