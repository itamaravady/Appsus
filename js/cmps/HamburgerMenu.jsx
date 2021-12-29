const { NavLink } = ReactRouterDOM;

export function HamburgerMenu(props) {
    const { classes } = props

    console.log('hmburger');
    return (
        <div className={`nav-links ${classes}`}>
            <NavLink className="clean-link" to="/book/"> Books</NavLink>
            <NavLink className="clean-link" to="/about/"> About</NavLink>
            <NavLink exact className="clean-link" to="/"> Home</NavLink>
        </div>
    )
}