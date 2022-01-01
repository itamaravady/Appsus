import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    getById,
    query,
    remove,
    addMail,
    changeReadMail,
    addStar
}

const KEY = 'mailsDB'

const gLoggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

function query(filterBy) {
    const mails = _loadFromStorage()
    let recievedMails;
    recievedMails = _getFilteredMails(mails, filterBy)

    return Promise.resolve(recievedMails)
}

function _getStatusStarredMails(mails, filterBy) {
    if (filterBy.isStarred) return mails.filter(mail => mail.isStarred === filterBy.isStarred)
    if (filterBy.status) return mails.filter(mail => mail.status === filterBy.status)
    if (filterBy.isRead !== 'all') return mails.filter(mail => mail.isRead === filterBy.isRead)
    if (filterBy.isRead === 'all') return mails.filter(mail => mail.status === 'inbox')
    return mails
}

function _getFilteredMails(mails, filterBy) {
    let newMails = _getStatusStarredMails(mails, filterBy)

    let { txt } = filterBy
    let txtFilteredMails
    if (!txt) {
        txtFilteredMails = newMails
    } else {
        txtFilteredMails = newMails.filter(mail => {
            return mail.subject.toLowerCase().includes(txt.toLowerCase()) ||
                mail.from.toLowerCase().includes(txt.toLowerCase())
        })
    }

    return txtFilteredMails
}

function addStar(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    mail.isStarred = !mail.isStarred
    _saveToStorage(mails)
    return Promise.resolve(mail)
}

function getById(mailId) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}


function addMail(newMail) {
    let mails = _loadFromStorage()

    // console.log(newMail);
    if (newMail.status === 'sent') {
        // console.log(newMail);
        let selectedMail = mails.find(mail => mail.id === newMail.id)
        if (selectedMail) {
            selectedMail.status = 'sent'
            _saveToStorage(mails)
            return Promise.resolve()
        }
    }

    let mail = {
        ...newMail,
        id: utilService.makeId(),
        from: gLoggedinUser.fullname,
        fromMail: gLoggedinUser.email,
        sentAt: Date.now(),
    }
    // if (newMail.status === 'toSent') mail['status'] = 'sent'

    mails = [mail, ...mails]
    _saveToStorage(mails)
    return Promise.resolve()
}

function remove(mailId) {
    var mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve()
}


function _createMails() {
    const mails = _loadFromStorage()
    if (!mails || !mails.length) {
        let mails = getMails()

        _saveToStorage(mails)
    }
}

function changeReadMail(mailId, isManual) {
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mail.id === mailId)
    if (isManual) mail.isRead = !mail.isRead
    else if (!isManual) mail.isRead = true
    _saveToStorage(mails)

    return Promise.resolve()
}



function _saveToStorage(mails) {
    storageService.save(KEY, mails)
}
function _loadFromStorage() {
    return storageService.load(KEY)
}



function getMails() {
    return [
        {
            id: utilService.makeId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes, talk to me when you got the time and available, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. I got so much to tell you, you wo\'nt believe it!',
            isRead: false,
            isStarred: false,
            sentAt: Date.now(),
            to: gLoggedinUser.email,
            from: 'Shuki',
            fromMail: 'Shuki@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'wassup?',
            body: 'Tell me when you are ready for the party, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. i will take us there! no worries!',
            isRead: false,
            isStarred: true,
            sentAt: 15511339319,
            to: gLoggedinUser.email,
            from: 'Puki',
            fromMail: 'Puki@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'Important meeting',
            body: 'you know we have this huge meeting with the lots of money involved, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. dont be late! show up in time! and you must be prepared man!',
            isRead: false,
            isStarred: false,
            sentAt: 1551,
            to: gLoggedinUser.email,
            from: 'Rooki',
            fromMail: 'Rooki@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'play a game bruh',
            body: 'Man it\'s been yearsssss, we gotta play, although it is easy money for me, it will be lots of fun so really,Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. but really.... tell me when do you Wanna play some basketball??',
            isRead: false,
            isStarred: false,
            sentAt: 155113,
            to: gLoggedinUser.email,
            from: 'Steph Curry',
            fromMail: 'Steph@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'Money man...',
            body: 'I really need the money back bro, not cool! you know I am going out tonight so do not be like this,Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. do me a favor okay? talk to me when you see it!',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'My Brother',
            fromMail: 'shimmiG@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'The Date',
            body: 'I know it has been a lil bit akward but I do not really care,Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. I want us to go out ASAP so you gotta tell when will you pick me up and where we going???',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Jennifer Aniston',
            fromMail: 'jennn111@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'Problem brother',
            body: 'if you touch Jennnifer, you wiil have a problem with me man! we have talked about it, be a man.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. you gave your word and that\'s that!',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Ben Afleck',
            fromMail: 'BatmanCool@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'My New Movie',
            body: 'I want you to my new. prime time movie man. it\'s gonna be lit so talk to me if you in about it.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. oh man it will be the biggest thing of 2022,IF YOU SMELLLLLL....',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Dwayne Johnson',
            fromMail: 'TheRock@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'Pick me up man',
            body: 'Look I do not have a ride for tonight and I know that you do, please tell him to take me on the way,Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. I really wanna come with you two dude!',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Junior Essa',
            fromMail: 'itsJuniorBrotha@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'Wedding Invitation',
            body: 'I am getting married ahahahahhaha, I know you will be there,Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quod tempora tempore eligendi quaerat iusto atque laboriosam maxime, mollitia sint alias nulla totam velit, deserunt culpa numquam adipisci ex aspernatur. and you gonna dance like mad crazy until you legs fall off you body!!!! I just can not wait. See you then!!!!!',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Kessy Lee',
            fromMail: 'KessyL123@gmail.com',
            status: 'inbox'

        },
    ]
}