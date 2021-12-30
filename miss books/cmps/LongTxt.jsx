
export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false
    }



    getDesc = () => {
        const { text } = this.props
        const { isLongTxtShown } = this.state
        if (isLongTxtShown) return text
        const shortTxt = text.substring(0, 100)
        return shortTxt
    }


    getDescType = () => {
        if (this.state.isLongTxtShown) return '  Less...'
        return '  More...'
    }


    changeStateTxtShown = () => {
        let { isLongTxtShown } = this.state
        isLongTxtShown = !isLongTxtShown
        this.setState({ isLongTxtShown })
    }

    render() {
        return (
            <p>{this.getDesc()}
                <span onClick={() => this.changeStateTxtShown()} className='more-less-desc'>
                    {this.getDescType()}
                </span>
            </p>
        )
    }
}