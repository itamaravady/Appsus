
import { MailPreview } from '../cmps/MailPreview.jsx'

export function MailList({ mails, onAddStar }) {

    if (!mails || !mails.length) return <h1>No Emails For now! 😀</h1>
    return (
        <section className="mail-list">
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} onAddStar={onAddStar} />)}
        </section>
    )
}