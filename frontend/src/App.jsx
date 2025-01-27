import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import CreatePostForm from './pages/CreatePostForm';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
        <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create-post" element={<CreatePostForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;
