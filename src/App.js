import React from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useThemeHook } from './GlobalComponents/ThemeProvider';
import Header from "./components/Header";
import { Router } from "@reach/router";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import {Link} from '@reach/router'
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  
  const [theme] = useThemeHook()
  
  return (
    <main className={theme ? 'bg-black' : 'bg-light-2'} style={{height: '100vh', overflowY: 'auto'}}>
      <Header />
      <Router>
        <Home path="/"/>
        <Login path="login"/>
        <Register path="register"/>
        <Cart path="/cart"/>
        <ProductDetails path='product-details/:productId'/>
      </Router>
    </main>
  );
}

export default App;
