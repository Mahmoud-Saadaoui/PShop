import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './screens/Cart'
import SignIn from './screens/SignIn'
import ProductScreen from './screens/ProductScreen'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/product/:id' element={<ProductScreen/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<SignIn/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App