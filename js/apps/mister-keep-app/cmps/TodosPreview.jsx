import { utilService } from '../../../services/util.service.js'

export function TodosPreview(props) {
    var { todos } = props;
    todos = todos.split(',').map(todo => ({ txt: todo }))
    return (

        <ul>
            {todos.map(todo => <li className="todos-preview clean-list" key={utilService.makeId()} >{todo.txt}</li>)}
        </ul>

    )
}