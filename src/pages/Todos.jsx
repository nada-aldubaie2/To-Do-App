import { useEffect } from 'react'
import useAuthStore from '../stores/authStore'
import useTodoStore from '../stores/todoStore'
import AuthGuard from '../components/AuthGuard'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

export default function Todos() {
  const { user } = useAuthStore()
  const { todos, loadTodos } = useTodoStore()
  
  useEffect(() => {
    loadTodos()
  }, [loadTodos])
  
  return (
    <AuthGuard>
      <div className="todos-page">
        <h2>Welcome, {user?.email}</h2>
        <TodoForm />
        <div className="todos-list">
          {todos.length === 0 ? (
            <p>No todos yet. Add your first task!</p>
          ) : (
            todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </div>
      </div>
    </AuthGuard>
  )
}