import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CartScreen from './screens/CartScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<HomeScreen/>}/>
        <Route path='/product/:id' element={<ProductScreen/>}/>
        <Route path='/cart' element={<CartScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        
        <Route path='' element={<PrivateRoute/>}>
          <Route path='/shipping' element={<ShippingScreen/>}/>
          <Route path='/payment' element={<PaymentScreen/>}/>
        </Route>
      </Routes>
      <Footer/>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App