import { utilService } from '../../../services/util.service.js'

export function MailsPreview(props) {
    var { mail } = props;
    mail = mail.split(',').map(mail => ({ txt: mail }))
    return (

        <ul>
            {mail.map(mail => <li className="mails-as-notes-preview clean-list" key={utilService.makeId()} >{mail.txt}</li>)}
        </ul>

    )
}