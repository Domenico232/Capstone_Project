import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarTop from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import Profile from './Components/Profile';
import ChessGame from './Components/Chessgame';

function App() {
  return (

    <div id='App'>
    <BrowserRouter>
        <NavbarTop />
      <Routes>
      <Route path="*" element={<RegisterPage />}></Route>
        <Route path="LoginPage" element={<LoginPage />}></Route>
        <Route path="chessgame/:userName/:param2" element={<ChessGame />}>
        </Route>
        <Route path="Profile/:param1/" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
