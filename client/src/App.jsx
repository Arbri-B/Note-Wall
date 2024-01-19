import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Form from './components/CreateNote';
import Home from './views/Home';
import DisplayOne from './components/SingleNote';
import Edit from './components/EditNote';

function App() {



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
