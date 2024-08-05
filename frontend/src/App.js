import './App.css';
import {BrowserRouter, Routes, Route}  from 'react-router-dom';

import { AuthProvider } from './firebase/authContext';

import Home from './components/home';
import Login from './components/login';
import Header from './components/header';


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </BrowserRouter>
      
    </div>
    </AuthProvider>
  );
}

export default App;
