import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Form from './components/CreateNote';
import Home from './views/Home';
import DisplayOne from './components/SingleNote';
import Edit from './components/EditNote';

function App() {


  // declaring the state
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route path='/notes/new' element={<Form />} />

        <Route path="/notes/:id" element={<DisplayOne />} />
        <Route path="/notes/edit/:id" element={<Edit />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
