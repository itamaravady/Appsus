import { ColorMenu } from './ColorMenu.jsx'

export class NoteMenu extends React.Component {
    state = {
        car: 1,
    }

    setBgc = (color) => {
        this.props.onSetStyle({ backgroundColor: color })
    }


    render() {
        const { onRemove, onEdit, toggleColorMenu, onDuplicate, onPinned, menuClasses, pinClasses } = this.props;
        return (
            <div className={menuClasses}>
                <div className="btns-note-menu">
                    <img className={`btn-note-pin ${pinClasses}`} src="assets/svg/note/pin.svg" onClick={onPinned} />
                    <img className="btn-note-edit" src="assets/svg/note/edit.svg" onClick={onEdit} />
                    <img className="btn-note-duplicate" src="assets/svg/note/duplicate.svg" onClick={onDuplicate} />
                    <img className="btn-note-bgc" src="assets/svg/note/color-palette.svg" onClick={toggleColorMenu} />
                    <img className="btn-note-remove" src="assets/svg/trash-bin.svg" onClick={onRemove} />
                </div>
                {this.props.getIsColorMenuOpen() && <ColorMenu setBgcColor={this.setBgc} />}
            </div>
        )
    }
}