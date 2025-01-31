import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import PostDetails from './pages/PostDetails';
import CreatePostForm from './pages/CreatePostForm';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Explore from './pages/Explore';
import UserSnippets from './pages/UserSnippets';
import UserPostDetail from './pages/UserPostDetail';



const App = () => {
  return (
    <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/user/:id" element={<UserPostDetail />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-post" element={<CreatePostForm />} />
          <Route path="/my-snippets" element={<UserSnippets />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
