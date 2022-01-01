export class NoteFilter extends React.Component {
    state = {
        inputTxt: '',
    }
    // filterBy

    onBlur = () => {
        this.setState({
            inputTxt: '',
        });
    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value });
    }

    submit = (ev) => {
        ev.preventDefault();
        const { inputTxt } = this.state;
        this.props.onSetFilter(inputTxt);
        // this.onBlur();
    }

    clearSearch = () => {
        this.props.onSetFilter('');
        this.setState({ inputTxt: '' })
        // this.onBlur();
    }

    render() {
        const { inputTxt } = this.state;
        return (
            <form onSubmit={this.submit} >
                <input
                    type="text"
                    autoComplete="off"
                    placeholder={'Search notes'}
                    className="add-input"
                    name="inputTxt"
                    onChange={this.handleChange}
                    value={inputTxt} />
                <button onClick={this.clearSearch} type="button">Clear</button>
            </form>
        )
    }
}