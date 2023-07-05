import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarTop from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from './Components/Home';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';

function App() {
  return (

    <div id='App'>
    <BrowserRouter>
        <NavbarTop />
      <Routes>
      <Route path="*" element={<RegisterPage />}>
        </Route>
        <Route path="LoginPage" element={<LoginPage />}></Route>
        <Route path="Home/:parametroNome" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
