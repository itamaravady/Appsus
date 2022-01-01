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
                isPinned: true,
                info: {
                    title: 'The Fresh Prince Of Bel Air',
                    inputTxt: 'Now, this is a story all about how My life got flipped-turned upside down And Id like to take a minute Just sit right there Ill tell you how I became the prince of a town called Bel- Air',
                    txt: 'Now, this is a story all about how My life got flipped-turned upside down And Id like to take a minute Just sit right there Ill tell you how I became the prince of a town called Bel- Air',
                },
                style: {
                    backgroundColor: '#fff',
                    font: 'ariel',
                }
            },
            {
                id: utilService.makeId(),
                type: 'todos',
                isPinned: false,
                title: 'חשמל',
                info: {
                    inputTxt: 'חוזה 345953585,מונה 5009441',
                    todos: [
                        { id: utilService.makeId(), todo: 'חוזה 345953585', isDone: false },
                        { id: utilService.makeId(), todo: 'מונה 5009441', isDone: false },

                    ],
                },
                style: {
                    backgroundColor: '#f2e863',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'img',
                isPinned: false,
                info: {
                    title: 'Let the dog out',
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
                isPinned: false,
                info: {
                    title: 'gotta watch this!',
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
                    inputTxt: 'git add .,git commit,git pull,git push,git pray',
                    label: 'Personal',
                    todos: [
                        { id: utilService.makeId(), todo: 'git add .', isDone: true },
                        { id: utilService.makeId(), todo: 'git commit', isDone: false },
                        { id: utilService.makeId(), todo: 'git pull', isDone: false },
                        { id: utilService.makeId(), todo: 'git push', isDone: false },
                        { id: utilService.makeId(), todo: 'git pray', isDone: false },
                    ],
                },
                style: {
                    backgroundColor: '#f2cd60',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'todos',
                isPinned: false,
                info: {
                    title: 'Shopping',
                    inputTxt: 'bananas,tomatoes,eggs,shampoo,time for my wife',
                    todos: [
                        { id: utilService.makeId(), todo: 'bananas', isDone: false },
                        { id: utilService.makeId(), todo: 'tomatoes', isDone: false },
                        { id: utilService.makeId(), todo: 'eggs', isDone: false },
                        { id: utilService.makeId(), todo: 'shampoo', isDone: false },
                        { id: utilService.makeId(), todo: 'time for my wife', isDone: false },
                    ],
                },
                style: {
                    backgroundColor: '#f2e863',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'img',
                isPinned: false,
                info: {
                    title: 'get vision test',
                    inputTxt: 'https://worldbirds.com/wp-content/uploads/2020/08/eagle-symbolism6.jpg',
                    img: 'https://worldbirds.com/wp-content/uploads/2020/08/eagle-symbolism6.jpg',
                },
                style: {
                    backgroundColor: '#ffffff',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'txt',
                isPinned: false,
                info: {
                    inputTxt: 'פעילות עצימה וקצרה מעודדת שימוש במצבורי סוכר (גליקוגן בשרירים ובכבד) ומונעת רגישות לאינסולין - דבר המשפר עירנות ואנרגטיות.פעילות מתונה כמו הליכה ושינה שורפת שומן!ניתן לאכול כמה שרוצים עד ששובעים! אין טעם להגביל את הצריכה הקלורית. אכילת ארוחה שומנית ונמוכה בסוכר תמנע צבירת שומן מיותר!',
                    txt: 'פעילות עצימה וקצרה מעודדת שימוש במצבורי סוכר (גליקוגן בשרירים ובכבד) ומונעת רגישות לאינסולין - דבר המשפר עירנות ואנרגטיות.פעילות מתונה כמו הליכה ושינה שורפת שומן!ניתן לאכול כמה שרוצים עד ששובעים! אין טעם להגביל את הצריכה הקלורית. אכילת ארוחה שומנית ונמוכה בסוכר תמנע צבירת שומן מיותר!',

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
                    title: 'Names for kids',
                    inputTxt: 'Shemesh,Tentzer,Ogen,Sassi,Eti',
                    label: 'Personal',
                    todos: [
                        { id: utilService.makeId(), todo: 'Shemesh', isDone: true },
                        { id: utilService.makeId(), todo: 'Tenzer', isDone: false },
                        { id: utilService.makeId(), todo: 'Ogen', isDone: false },
                        { id: utilService.makeId(), todo: 'Sassi', isDone: false },
                        { id: utilService.makeId(), todo: 'Eti', isDone: false },
                    ],
                },
                style: {
                    backgroundColor: '#f2cd60',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'txt',
                isPinned: false,
                info: {
                    title: 'Dont forget',
                    inputTxt: 'google pass: q1w2e3r4, credit card pin:1234, social security number:946352178-0',
                    txt: 'google pass: q1w2e3r4, credit card pin:1234, social security number:946352178-0',
                },
                style: {
                    backgroundColor: '#adefa7',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'img',
                isPinned: false,
                info: {
                    title: 'We are Appsus!!',
                    inputTxt: 'https://media.giphy.com/media/kPtvFOjXCuq9B4PzC7/giphy.gif',
                    img: 'https://media.giphy.com/media/kPtvFOjXCuq9B4PzC7/giphy.gif',
                },
                style: {
                    backgroundColor: '#ffffff',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'txt',
                isPinned: false,
                info: {
                    title: 'Watch list',
                    inputTxt: 'Selma ,Straight out of compton, The green beautiful, The first grader, The butler, Inequality for all, I daniel blake, perfect strangers, Incendies -סרט מעולה, Cartel land 2015, Amy 2015, the flat,Cosmos (new version),My beautiful broken brain !,Fast, cheap and out of control,The Fog of war,What happened Miss Simone?,ALIVE INSIDE,Baraka,Samsara,O. J Made In America,Dark Days,Tashi and the monk,Into the Inferno ,Grizzly Men,Until The Light Takes Us.,Under the Sun,Food inc,Cowspiracy,Examined Life by Astra Taylor,The Sale of America',
                    txt: 'Selma ,Straight out of compton, The green beautiful, The first grader, The butler, Inequality for all, I daniel blake, perfect strangers, Incendies -סרט מעולה, Cartel land 2015, Amy 2015, the flat,Cosmos (new version),My beautiful broken brain !,Fast, cheap and out of control,The Fog of war,What happened Miss Simone?,ALIVE INSIDE,Baraka,Samsara,O. J Made In America,Dark Days,Tashi and the monk,Into the Inferno ,Grizzly Men,Until The Light Takes Us.,Under the Sun,Food inc,Cowspiracy,Examined Life by Astra Taylor,The Sale of America',

                },
                style: {
                    backgroundColor: '#adefa7',
                    font: 'impact',
                }
            },
            {
                id: utilService.makeId(),
                type: 'txt',
                isPinned: false,
                info: {
                    inputTxt: 'רוטב הולנדז - חלמון חמאה מים לימון (או יין לבן) - מתובל במלח ופלפל קאיין או לבן. טוב לדגים וביצים.איולי - שום ושמן זית. ניתן להוסיף חלמון. טוב לסלטים.בורדלז - יין אדום מצומצם עם מח עצם בצל וציר בקר.טוב כרוטב לסטייק.לבנה - בר בלאן - צמצום יין לבן וחומץ עם בצל. הוספת חמאה קרה. טוב לדגים וירקות.רוטב חמאה שחורה - בר נואר - הכנת גהי - והוספת לימון ופטרוזיליה. טוב לדגים ירקות וביצים.ולד - רוטב מיונז, צלפים, מלפפון חמוץ, חרדל, אנשובי ותבלינים כגון עירית וטרגון. טוב לבשרים דגים ירקות ומטוגניםרוי - רואי - Rouille - מיונז משמן זית!4 רטבי היסוד - בשמל, עגבניות, אספניול, ולוטההרוטב החמישי - הולנדז.ברייה סברין - פזיולוגיה של הטעם.',
                    txt: 'רוטב הולנדז - חלמון חמאה מים לימון (או יין לבן) - מתובל במלח ופלפל קאיין או לבן. טוב לדגים וביצים.איולי - שום ושמן זית. ניתן להוסיף חלמון. טוב לסלטים.בורדלז - יין אדום מצומצם עם מח עצם בצל וציר בקר.טוב כרוטב לסטייק.לבנה - בר בלאן - צמצום יין לבן וחומץ עם בצל. הוספת חמאה קרה. טוב לדגים וירקות.רוטב חמאה שחורה - בר נואר - הכנת גהי - והוספת לימון ופטרוזיליה. טוב לדגים ירקות וביצים.ולד - רוטב מיונז, צלפים, מלפפון חמוץ, חרדל, אנשובי ותבלינים כגון עירית וטרגון. טוב לבשרים דגים ירקות ומטוגניםרוי - רואי - Rouille - מיונז משמן זית!4 רטבי היסוד - בשמל, עגבניות, אספניול, ולוטההרוטב החמישי - הולנדז.ברייה סברין - פזיולוגיה של הטעם.',

                },
                style: {
                    backgroundColor: '#61e8e1',
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
    const notes = _loadNotesFromStorage();

    const duplicateNote = JSON.parse(JSON.stringify(note))
    duplicateNote.info = { ...duplicateNote.info, [duplicateNote.type]: inputTxt, inputTxt: inputTxt }
    if (duplicateNote.type === 'todos') {
        const todos = _formatTodos(inputTxt);
        duplicateNote.info.todos = todos;
    }

    const noteIdx = notes.findIndex(note => note.id === duplicateNote.id)
    notes.splice(noteIdx, 1, duplicateNote);
    _saveNotesToStorage(notes);
    return Promise.resolve(duplicateNote);
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
    return notes.filter(note => (note.info.inputTxt.toLowerCase()).includes(filterBy.toLowerCase()))
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