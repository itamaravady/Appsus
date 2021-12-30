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
        const { msg } = this.state

        if (!msg) return <React.Fragment></React.Fragment>
        return (
            <div className="user-msg" >
                <h3>{msg.txt}</h3>
                {msg.name === 'book' && < a href={`/#/book/${msg.type.id}`}> Check it Out</a>}
            </div>
        )

    }

}