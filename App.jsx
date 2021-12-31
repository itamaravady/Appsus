// books
import { BookApp } from './js/apps/miss-book-app/pages/BookApp.jsx'
import { MailApp } from './js/apps/mister-mail-app/pages/MailApp.jsx'
import { BookDetails } from './js/apps/miss-book-app/pages/BookDetails.jsx'

// notes
import { NoteApp } from './js/apps/mister-keep-app/pages/NoteApp.jsx'
import { NoteDetails } from './js/apps/mister-keep-app/pages/NoteDetails.jsx'

//general

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
                <main>
                    <Switch>
                        {/* books */}
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={BookApp} path="/book" />

                        {/* note */}
                        {/* <Route component={NoteDetails} path="/note/:noteId" /> */}
                        <Route component={NoteApp} path="/note" />

                        {/* Mail */}
                        {/* <Route component={MailDetails} path="/mail/:mailId" /> */}
                        <Route component={MailApp} path="/mail" />

                        {/* general */}
                        <Route component={About} path="/about" />
                        <Route component={Home} path="/" />
                    </Switch>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}