import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'
import PostDetails from './pages/PostDetails';
import CreatePostForm from './pages/CreatePostForm';


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/create-post" element={<CreatePostForm />} />
    </Routes>
  </Router>
  )
}

export default App