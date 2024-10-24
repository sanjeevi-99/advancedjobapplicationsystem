import React from 'react';
import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Navbar/>
      <div>
        <Outlet></Outlet>
      </div>
      <Toaster />
    </div>
  );
};

export default App;