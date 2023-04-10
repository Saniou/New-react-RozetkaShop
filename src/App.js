import React, {useState} from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useThemeHook } from './GlobalComponents/ThemeProvider';
import { Router } from "@reach/router";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductTable from "./Pages/productTable";



function App() {
  const [theme] = useThemeHook()

  return (
    <main className={theme ? 'bg-black' : 'bg-light-2'} style={{height: '100vh', overflowY: 'auto'}}>
      <Header />
  
      <Router>
        <Home exact path="/"/>
        <Login  path="login"/>
        <Register path="register"/>
        <Cart path="/cart"/>
        <ProductTable path="/product-table"/>
        <ProductDetails path='product-details/:productId'/>
      </Router>
    </main>
  
  );
}  

export default App;
