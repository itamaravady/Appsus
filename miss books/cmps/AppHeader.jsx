
const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

    render() {
        return (
            <header className="app-header">
                <div className="main-header main-layout">
                <h1 onClick={() => this.props.history.push('/')}> Miss Books</h1>
                <nav className="main-nav">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/book">Our books</NavLink>
                </nav>
                </div>
            </header>
        )
    }
}

export const AppHeader = withRouter(_AppHeader)