import { eventBusService } from '../services/eventBusService.js';

export class UserMsg extends React.Component {

    state = {
        msg: null,
    }
    removeEventBus = null;
    timeoutId = null;

    componentDidMount() {

        this.removeEventBus = eventBusService.on('user-msg', (msg) => {
            this.setState({ msg }, this.onAutoClose);
        })
    }


    onAutoClose() {
        this.timeoutId = setTimeout(() => {
            this.onCloseMsg()
        }, 3000);
    }

    onCloseMsg() {
        clearTimeout(this.timeoutId);
        this.setState({ msg: null })
    }

    componentWillUnmount() {
        this.removeEventBus();
    }

    render() {
        console.log('did render');
        const { msg } = this.state
        console.log(msg);
        if (!msg) return <React.Fragment></React.Fragment>
        return (
            <div className="user-msg" >
                <h3>{msg.txt}</h3>
                <a href={`/#/book/${msg.book.id}`}> Check it Out</a>
            </div>
        )

    }

}