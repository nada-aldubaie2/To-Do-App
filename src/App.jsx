import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import Navbar from './components/Navbar'
import './styles/App.css'
function App() {

  return (
    <div className='app'>
            <Navbar />
      <div className="container">
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Todos/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
