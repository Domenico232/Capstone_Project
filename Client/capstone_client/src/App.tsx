import React from 'react';
import './App.css';
import Chessgame from './Components/Chessgame';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';


function App() {
  return (

      <div id='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/ciao" element={<Chessgame />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
