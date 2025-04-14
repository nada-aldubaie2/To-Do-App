import { create } from 'zustand'

const useTodoStore = create((set) => ({
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  
  loadTodos: () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    
    const allTodos = JSON.parse(localStorage.getItem('todos')) || []
    const userTodos = allTodos.filter(todo => todo.userEmail === user.email)
    set({ todos: userTodos })
  },
  
  addTodo: (text) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      userEmail: user.email
    }
    
    const allTodos = JSON.parse(localStorage.getItem('todos')) || []
    const updatedTodos = [...allTodos, newTodo]
    
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    set({ todos: updatedTodos.filter(todo => todo.userEmail === user.email) })
  },
  
  toggleTodo: (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    
    const allTodos = JSON.parse(localStorage.getItem('todos')) || []
    const updatedTodos = allTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    set({ todos: updatedTodos.filter(todo => todo.userEmail === user.email) })
  },
  
  deleteTodo: (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    
    const allTodos = JSON.parse(localStorage.getItem('todos')) || []
    const updatedTodos = allTodos.filter(todo => todo.id !== id)
    
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    set({ todos: updatedTodos.filter(todo => todo.userEmail === user.email) })
  }
}))

export default useTodoStore