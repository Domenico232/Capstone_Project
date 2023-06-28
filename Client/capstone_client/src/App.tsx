import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavbarTop from './Components/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from './Components/Home';

function App() {
  return (

    <div id='App'>
    <BrowserRouter>
        <NavbarTop />
      <Routes>
        <Route path="*" element={<Home />}>
        </Route>
        <Route path="43" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
