import { ColorMenu } from './ColorMenu.jsx'

export class NoteMenu extends React.Component {
    state = {
        car: 1,
    }

    setBgc = (color) => {
        this.props.onSetStyle({ backgroundColor: color })
    }


    render() {
        const { onRemove, onEdit, toggleColorMenu, onDuplicate } = this.props;
        return (
            <div className={this.props.classes}>
                <div className="btns-note-menu">
                    <img className="btn-note-remove" src="/assets/svg/trash-bin.svg" onClick={onRemove} />
                    <img className="btn-note-edit" src="/assets/svg/note/edit.svg" onClick={onEdit} />
                    <img className="btn-note-bgc" src="/assets/svg/note/color-palette.svg" onClick={toggleColorMenu} />
                    <img className="btn-note-duplicate" src="/assets/svg/note/duplicate.svg" onClick={onDuplicate} />
                </div>
                {this.props.getIsColorMenuOpen() && <ColorMenu setBgcColor={this.setBgc} />}
            </div>
        )
    }
}