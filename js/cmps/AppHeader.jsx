const { NavLink, Link, Route } = ReactRouterDOM;
import { HamburgerMenu } from './HamburgerMenu.jsx'


export class AppHeader extends React.Component {

    state = {
        classes: null,
        isMenuOpen: false,
    }
    toggleMenu = (action) => {
        if (action === 'hide') this.setState({ classes: null });
        else this.setState({ classes: 'open' });
    }
    render() {
        const { classes } = this.state;
        return (
            <section className="header-container">
                <header className="app-header main-layout">
                    <NavLink exact className="clean-link" to="/"><h1 className="seconday-header">Appsus</h1></NavLink>
                    {/* <h2>Appsus</h2> */}

                    <img src="/assets/svg/hamburger.svg" onMouseOver={this.toggleMenu} />
                    {<HamburgerMenu onLeave={() => this.toggleMenu('hide')} classes={classes} />}
                </header>
            </section>
        )
    }

}