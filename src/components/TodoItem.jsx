import useTodoStore from '../stores/todoStore'

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo } = useTodoStore()
  
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
      <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
        Delete
      </button>
    </div>
  )
}