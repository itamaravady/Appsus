const { NavLink, Link, Route } = ReactRouterDOM;
import { HamburgerMenu } from './HamburgerMenu.jsx'


export class AppHeader extends React.Component {

    state = {
        classes: null,
        isMenuOpen: false,
    }
    toggleMenu = () => {
        if (this.state.classes) this.setState({ classes: null });
        else this.setState({ classes: 'open' });
    }
    render() {
        const { classes } = this.state;
        return (
            <section className="header-container">
                <header className="app-header main-layout">
                    <h1 className="seconday-header">Appsus</h1>
                    <button onClick={this.toggleMenu}>H</button>
                    {<HamburgerMenu onLeave={this.toggleMenu} classes={classes} />}
                </header>
            </section>
        )
    }

}