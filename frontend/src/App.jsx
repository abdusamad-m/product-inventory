import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductForm from './pages/ProductFrom';
import ProductList from './pages/ProductList';
import StockManager from './pages/StockManager';
import Home from './pages/home';




function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/productform' element={<ProductForm/>}/>
        <Route path='/productlist' element={<ProductList/>}/>
        <Route path='/stockmanager' element={<StockManager/>}/>
        <Route path='/Home' element={<Home/>}/>

        


        
      </Routes>
     </Router>
          
    </>
  )
}

export default App
