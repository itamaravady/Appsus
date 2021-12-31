const { NavLink } = ReactRouterDOM;

export function Home() {
    return (
        <div className="home">
            <h2>Welcome to Appsus.</h2>

            <div className="home-links-container">
                <NavLink className="clean-link" to="/mail/"> <img src="../../assets/img/mail-home.png" /></NavLink>
                <NavLink className="clean-link" to="/note/"> <img src="../../assets/img/notes-home.png" /></NavLink>
                <NavLink className="clean-link" to="/book/"> <img src="../../assets/img/book-home.png" /></NavLink>
            </div>
        </div>
    )
}