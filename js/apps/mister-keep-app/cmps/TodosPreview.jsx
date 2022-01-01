import { utilService } from '../../../services/util.service.js'

export function TodosPreview(props) {
    var { todos, setTodo, noteId } = props;
    todos.sort((todo1, todo2) => {

        return (todo1.isDone === todo2.isDone) ? 0 : todo1.isDone ? 1 : -1
    });
    return (

        <ul>
            {todos.map((todo) => {
                return <li
                    className="todos-preview clean-list"
                    key={utilService.makeId()}
                    style={{ textDecorationLine: todo.isDone && 'line-through' }}
                    onClick={() => {
                        if (noteId) return setTodo(todo.id)
                    }}
                >{todo.todo}</li>
            })}
        </ul>

    )
}