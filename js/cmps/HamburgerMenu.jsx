const { NavLink } = ReactRouterDOM;

export function HamburgerMenu(props) {
    const { classes } = props

    console.log('hmburger');
    return (
        <div onMouseLeave={props.onLeave} className={`nav-links ${classes}`}>
            <NavLink exact className="clean-link" to="/"> Home</NavLink>
            <NavLink className="clean-link" to="/mail/"> Email</NavLink>
            <NavLink className="clean-link" to="/note/"> Notes</NavLink>
            <NavLink className="clean-link" to="/book/"> Books</NavLink>
            <NavLink className="clean-link" to="/about/"> About</NavLink>
        </div>
    )
}