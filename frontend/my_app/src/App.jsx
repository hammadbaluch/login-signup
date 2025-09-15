import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import User from './components/User/User'   // ✅ import

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user' element={<User />} />   {/* ✅ User route */}
      </Routes>
    </Router>
  )
}

export default App
