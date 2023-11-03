import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import CreateTaskPage from './pages/CreateTaskPage';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:id" element={<TaskPage />} />
          <Route path="/new" element={<CreateTaskPage/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;