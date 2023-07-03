import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarTop from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from './Components/Home';
import LoginPage from './Components/RegisterPage';
import RegisterPage from './Components/RegisterPage';

function App() {
  return (

    <div id='App'>
    <BrowserRouter>
        <NavbarTop />
      <Routes>
      <Route path="Register" element={<RegisterPage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="*" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
