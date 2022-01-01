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
            <section className="note-filter">
                <form onSubmit={this.submit} >
                    <input
                        type="text"
                        autoComplete="off"
                        placeholder={'Search notes'}
                        className="filter-input"
                        name="inputTxt"
                        onChange={this.handleChange}
                        value={inputTxt} />
                </form>
                <img src="/assets/svg/clear.svg" onClick={this.clearSearch} type="button" />
            </section>
        )
    }
}