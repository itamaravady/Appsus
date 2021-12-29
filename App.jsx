import { BookApp } from './js/apps/miss-book-app/pages/BookApp.jsx'
import { MailApp } from './js/apps/mister-mail-app/pages/MailApp.jsx'
import { BookDetails } from './js/apps/miss-book-app/pages/BookDetails.jsx'
import { About } from './js/pages/About.jsx'
import { Home } from './js/pages/Home.jsx'

import { AppHeader } from './js/cmps/AppHeader.jsx'
import { UserMsg } from './js/cmps/UserMsg.jsx'
import { MailDetails } from './js/apps/mister-mail-app/pages/MailDetails.jsx'

const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main >
                    <Switch>
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={MailDetails} path="/mail/:mailId"/>
                        <Route component={BookApp} path="/book" />
                        <Route component={MailApp} path="/mail" />
                        <Route component={About} path="/about" />


                        <Route component={Home} path="/" />
                    </Switch>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}