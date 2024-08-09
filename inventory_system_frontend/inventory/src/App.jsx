import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Navbar from './pages/Navbar'
import ProductForm from './pages/ProductFrom';
import ProductList from './pages/ProductList';
import StockManager from './pages/StockManager';



function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/productform' element={<ProductForm/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
        <Route path='/stockmanager' element={<StockManager/>}/>

        


        
      </Routes>
     </Router>
          
    </>
  )
}

export default App
