import { mailService } from "../services/mail.service.js";


const { Link } = ReactRouterDOM



export function MailPreview({ mail, onAddStar, onToggleComposeModal, loadMails }) {

    function getShortBody() {
        if (mail.body.length > 30) {
            return mail.body.substring(0, 30) + '...'
        }
        return mail.body
    }

    function getTime(mailTime) {
        const date = new Date(mailTime)
        let hour = date.getHours()
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        if (hour > 12) {
            hour = (hour - 12)
            if (hour < 10) {
                hour = `0${hour}`
            }
            return `${hour}:${minutes} PM`
        }
        if (hour < 10) hour = `0${hour}`
        return `${hour}:${minutes} AM`
    }

    function changeReadMail(isManual) {
        mailService.changeReadMail(mail.id, isManual)
            .then(() => loadMails())
    }

    function toggleStar(mailId) {
        onAddStar(mailId)
    }

    function getDraftMail() {
        onToggleComposeModal()
    }

    return (
        <section>
            < article className="mail-preview" >
                <div className="actions-mail-preview-btns">
                    {mail.status === 'inbox' && <button onClick={() => { changeReadMail(true) }}><img src={mail.isRead ? "assets/img/email-img/read.png" : "assets/img/email-img/unread.png"} /></button>}
                    <button className={mail.isStarred ? 'star' : ''} onClick={() => { toggleStar(mail.id) }}>⭐</button>
                </div>
                <Link onClick={mail.status !== 'draft' ? () => { changeReadMail(false) } : getDraftMail} className="clean-link"
                    to={mail.status !== 'draft' ? `/mail/${mail.id}` : `/mail?mailId=${mail.id}`}>
                    <ul className="list-info-mail clean-list">
                        <li>{mail.from}</li>
                        <div className="body-title-container">
                            <li>{mail.subject}-</li>
                            <li>{getShortBody()}</li>
                        </div>
                        <li>{getTime(mail.sentAt)}</li>
                    </ul>
                </Link>
            </article >

        </section>
    )
}