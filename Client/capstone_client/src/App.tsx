import React from 'react';
import './App.css';
import Chessgame from './Components/Chessgame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarTop from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (

    <div id='App'>
    <BrowserRouter>
        <NavbarTop />
      <Routes>
        <Route path="*" element={<Chessgame />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
