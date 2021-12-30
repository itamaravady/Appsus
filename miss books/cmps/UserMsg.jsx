import { eventBusService } from "../services/event-bus.service.js"



export class UserMsg extends React.Component {

    state = {
        msg: {
            text: '',
            type: ''
        },
        msgCloseClass: ''

    }

    removeEventBus = null
    timeoutId = null

    componentDidMount() {
        this.removeEventBus = eventBusService.on('user-msg', (msg) => {
            clearTimeout(this.timeoutId)
            this.setState({ msg })
            this.onOpenMsg()
            this.onAutoClose()
        })
    }

    onAutoClose = () => {
        this.timeoutId = setTimeout(() => {
            this.onCloseMsg()
        }, 3000)
    }

    onCloseMsg = () => {
        this.setState({ msgCloseClass: '' })
        this.setState({ msg: { text: '', type: '' } })
    }

    onOpenMsg = () => {
        clearTimeout(this.timeoutId)
        this.setState({ msgCloseClass: 'open' })
    }

    componentWillUnmount() {
        this.removeEventBus()
    }

    render() {
        const { msg } = this.state
        return <div className={(this.state.msgCloseClass ? `${this.state.msgCloseClass}` : '') + ` user-msg ${msg.type} `}>
            <button onClick={this.onCloseMsg}>&times;</button>
            <h2>{msg.text}</h2>
        </div>
    }

} 