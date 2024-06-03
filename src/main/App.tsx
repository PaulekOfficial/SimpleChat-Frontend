import React from 'react';
import '../css/App.css';
import ChatWindow from "../components/ChatWindow";
import Register from "../login/Register";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "../login/Login";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={ <Login /> } />
              <Route path="/register" element={ <Register /> } />
              <Route path="/" element={ <ChatWindow /> } />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
