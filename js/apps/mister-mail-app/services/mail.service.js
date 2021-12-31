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

    console.log(newMail);
    if (newMail.status === 'sent') {
        console.log(newMail);
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
    console.log(isManual);
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
            body: 'Would love to catch up sometimes',
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
            body: 'Would love to catch up sometimes',
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
            subject: 'wassup?',
            body: 'Would love to catch up sometimes',
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
            body: 'Wanna play some basketball??',
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
            body: 'I really need the money back bro, not cool!',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'My Brother',
            fromMail: 'Bro@gmail.com',
            status: 'inbox'

        },
        {
            id: utilService.makeId(),
            subject: 'The Date',
            body: 'So when will you pick me up???',
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
            body: 'if you touch Jennnifer, you wiil have a problem with me man!',
            isRead: false,
            isStarred: false,
            sentAt: 1551133931912,
            to: gLoggedinUser.email,
            from: 'Ben Afleck',
            fromMail: 'BatmanCool@gmail.com',
            status: 'inbox'

        },
    ]
}