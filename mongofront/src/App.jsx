// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Test from './components/Test';
import NavScrollExample from './components/Navbar';
import BlogPost from './components/BlogPost';
import SearchResults from './components/SearchResults';
import AddPost from './components/AddPost';
import PostDetail from './components/PostDetails'; // Importa il componente PostDetail

function App() {
  return (
    <Router>
      <NavScrollExample />
      <Routes>
        <Route path="/" element={<Navigate to="/post" />} />
        <Route path="/autori" element={<Test />} />
        <Route path="/post" element={<BlogPost />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/post/:id" element={<PostDetail />} /> {/* Aggiungi la rotta per il dettaglio del post */}
      </Routes>
    </Router>
  );
}

export default App;
