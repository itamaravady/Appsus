const { NavLink } = ReactRouterDOM;

export function Home() {
    return (
        <div className="home">
            <div className="home-title">
                <h2>Appsus</h2>
            </div>
            <NavLink to="/mail/" className="clean-link"><button>Mister Email</button></NavLink>
            <NavLink to="/note/" className="clean-link"><button>Mister Keep</button></NavLink>
            <NavLink to="/book/" className="clean-link"><button>Miss Books</button></NavLink>
        </div>
    )
}