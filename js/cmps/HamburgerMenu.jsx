const { NavLink } = ReactRouterDOM;

export function HamburgerMenu(props) {
    const { classes } = props
    return (
        <div onMouseLeave={props.onLeave} className={`nav-links ${classes}`}>

            <NavLink className="clean-link" to="/mail/"> <img src="../../assets/img/mail.png" /></NavLink>
            <NavLink className="clean-link" to="/note/"> <img src="../../assets/img/notes.png" /></NavLink>
            <NavLink className="clean-link" to="/book/"> <img src="../../assets/img/books.png" /></NavLink>
            <NavLink className="clean-link" to="/about/"> <img src="../../assets/img/about.png" /></NavLink>
        </div>
    )
}