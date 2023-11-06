import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Register from './components/Register'
import Login from './components/Login';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import ViewWorkout from './components/ViewWorkout';
import AddWorkout from './components/AddWorkout'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/login' element={ <Login />} />
        <Route index path='/register' element={ <Register />} />
        <Route path='/workout/:id' element={ <ViewWorkout /> } />
        <Route path='/workout/add' element={ <AddWorkout />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
