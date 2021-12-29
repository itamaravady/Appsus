const { NavLink, Link, Route } = ReactRouterDOM;
import { HamburgerMenu } from './HamburgerMenu.jsx'


export class AppHeader extends React.Component {

    state = {
        classes: null,
    }
    toggleMenu = () => {
        console.log('toggle menu');
        if (this.state.classes) this.setState({ classes: null });
        else this.setState({ classes: 'open' });
    }
    render() {
        const { classes } = this.state;
        return (
            <section className="app-header">
                <header className="main-header">
                    <h1>Appsus</h1>
                </header>
                <button onClick={this.toggleMenu}>H</button>
                {classes && <HamburgerMenu classes={classes} />}
            </section>
        )
    }

}