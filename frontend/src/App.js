import './App.css';
import {BrowserRouter, Routes, Route}  from 'react-router-dom';

import { AuthProvider } from './firebase/authContext';

import Home from './components/home';
import Header from './components/header';
import Search from './components/search';
import Book from './components/book';
import Author from './components/author';
import Error from './components/error';
import Dashboard from './components/dashboard';
import ProtectedRoute from './components/protected';


function App() {
  return (
    <AuthProvider>
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/book/:id' element={<Book />} />
        <Route path='/author/:id' element={<Author />} />
        <Route path='*' element={<Error />} />

     
        <Route path='/dashboard/:userId'  element={ <ProtectedRoute>  {<Dashboard />}    </ProtectedRoute> } />
     

      </Routes>
      </BrowserRouter>
      
    </div>
    </AuthProvider>
  );
}

export default App;
