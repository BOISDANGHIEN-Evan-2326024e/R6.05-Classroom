import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useState } from 'react';

export default function App() {
  //const [currentPage, setCurrentPage] = useState('home');
  const [currentPage, setCurrentPage] = useState('dashboard'); 

  return (
    <>
      {currentPage === 'home' && <Homepage setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} />}
    </>
  );
}