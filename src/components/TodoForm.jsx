import { useState } from 'react'
import useTodoStore from '../stores/todoStore'

const TodoForm = () => {
    const [text, setText] = useState('')
    const {addTodo} = useTodoStore()

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!text)return
        
        addTodo(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add</button>
        </form>
    );
}

export default TodoForm;
