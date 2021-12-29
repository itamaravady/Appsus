import { mailService } from "../services/mail.service.js";


const { Link } = ReactRouterDOM



export function MailPreview({ mail }) {

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

    return (
        <section>
            <Link onClick={changeReadMail} className="clean-link" to={`/mail/${mail.id}`}>
                < article
                    className="mail-preview" >
                    <ul className="list-info-mail clean-list">
                        <li>{mail.from}</li>
                        <div className="body-title-container">
                            <li>{mail.subject}-</li>
                            <li>{getShortBody()}</li>
                        </div>
                        <li>{getTime(mail.sentAt)}</li>
                    </ul>
                </article >
            </Link>

        </section>
    )
}