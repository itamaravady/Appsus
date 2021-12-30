import { mailService } from "../services/mail.service.js";


const { Link } = ReactRouterDOM



export function MailPreview({ mail, onAddStar, onToggleComposeModal }) {

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

    function changeReadMail() {
        mailService.changeReadMail(mail.id)
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
                <button className={mail.isStarred ? 'star' : ''} onClick={() => { toggleStar(mail.id) }}>⭐</button>
                <Link onClick={mail.status !== 'draft' ? changeReadMail : getDraftMail} className="clean-link"
                    to={mail.status !== 'draft' ? `/mail/${mail.id}` : `/mail/compose/${mail.id}`}>
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