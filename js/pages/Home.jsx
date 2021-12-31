const { NavLink } = ReactRouterDOM;

export function Home() {
    return (
        <div className="home">
            <div className="home-title">
                <h2>Appsus</h2>
            </div>
            <NavLink className="clean-link" to="/mail/"> <img src="../../assets/img/mail.png" /></NavLink>
            <NavLink className="clean-link" to="/note/"> <img src="../../assets/img/notes.png" /></NavLink>
            <NavLink className="clean-link" to="/book/"> <img src="../../assets/img/books.png" /></NavLink>
        </div>
    )
}