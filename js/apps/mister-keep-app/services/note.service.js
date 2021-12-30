import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    waitQuery,
    query,
    removeNote,
    addNote,
    getNoteById,

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
                    backgroundColor: '#222',
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
                    backgroundColor: '#222',
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
                    backgroundColor: '#222',
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
        getNoteById(noteId)
            .then(note => {
                note.info = { ...note.info, [noteType]: inputText, inputTxt: inputText }
                const noteIdx = notes.findIndex(note => note.id === noteId)
                notes.splice(noteIdx, 1, note);
                console.log(notes);
                _saveNotesToStorage(notes);
                return Promise.resolve('');
            });
    } else {

        var note = {
            id: utilService.makeId(),
            type: noteType,
            isPinned: false,
            info: { [noteType]: inputText },
            style: {
                backgroundColor: '#fff',
                font: 'ariel',
            },
        }
        notes.push(note);
        _saveNotesToStorage(notes);
        return Promise.resolve('');
    }
}

function removeNote(noteId) {
    var notes = _loadNotesFromStorage();
    const noteIdxToRemove = notes.findIndex(note => note.id === noteId);
    notes.splice(noteIdxToRemove, 1);
    _saveNotesToStorage(notes);
    return Promise.resolve();
}



function _getFilteredNotes(notes, filterBy) {
    //todo!
    return notes
}

function getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    // return new Promise.Resolve(notes.find(book => book.id === bookId));
    return new Promise((resolve) => {
        const note = notes.find(note => note.id === noteId);
        // console.log(note);
        resolve(note);
    });
}

function _saveNotesToStorage(notes) {
    storageService.save(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.load(KEY);
}