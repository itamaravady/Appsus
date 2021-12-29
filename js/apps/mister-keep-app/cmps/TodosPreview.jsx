import { utilService } from '../../../services/util.service.js'

export function TodosPreview(props) {
    const { todos } = props;
    return (

        <ul>
            {todos.map(todo => <li className="todos-preview clean-list" key={utilService.makeId()} >{todo.txt}</li>)}
        </ul>

    )
}