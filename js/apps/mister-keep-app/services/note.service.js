import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const noteService = {
    waitQuery,
    query,
    removeNote,
    addNote,
    // getBookById,
    // addReview,
    // searchBooks,
    // addGoogleBook,
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
                    title: 'my poem',
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
                    title: 'my image',
                    imgUrl: 'https://ggsc.s3.amazonaws.com/images/made/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner_300_200_int_c1-1x.jpg',
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
                    title: 'practice',
                    videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                },
            },
            {
                id: utilService.makeId(),
                type: 'todos',
                isPinned: false,
                info: {
                    label: 'Personal',
                    todos: [
                        { txt: 'buy bananas', doneAt: null },
                        { txt: 'get a haircut', doneAt: 187111111 },
                    ]
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
                    label: 'Personal',
                    todos: [
                        { txt: 'buy tomatoes', doneAt: null },
                        { txt: 'delete me', doneAt: 187111111 },
                    ]
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

function addNote(inputText, noteType) {
    var notes = _loadNotesFromStorage();

    var info;
    switch (noteType) {
        case 'txt':
            info = {
                title: 'title',
                txt: inputText,
            }
            break;
        case 'img':
            info = {
                imgUrl: inputText,
            }
            break;
        case 'video':
            info = {
                videoUrl: inputText,
            }
        case 'todos':
            var todos = inputText.split(',').map(todo => ({ txt: todo }))
            info = {
                title: 'New list',
                todos,
            }
            break;
    }
    console.log(inputText.split(','));
    const note = {
        id: utilService.makeId(),
        type: noteType,
        isPinned: false,
        info,
        style: {
            backgroundColor: '#fff',
            font: 'ariel',
        },
    }
    notes.push(note);
    _saveNotesToStorage(notes);
    return Promise.resolve();
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

function _getNoteById(noteId) {
    const notes = _loadNotesFromStorage()
    // return new Promise.Resolve(notes.find(book => book.id === bookId));
    return new Promise((resolve) => {
        const note = notes.find(note => note.id === noteId);
        resolve(note);
    });
}

function _saveNotesToStorage(notes) {
    storageService.save(KEY, notes)
}

function _loadNotesFromStorage() {
    return storageService.load(KEY);
}