import React from 'react';
import '../css/App.css';
import ChatWindow from "../components/ChatWindow";
import Register from "../login/Register";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "../login/Login";
import GuestRoute from "../guard/GuestRoute";
import GuardedRoute from "../guard/GuardedRoute";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={ <GuestRoute element={<Login />} /> } />
              <Route path="/register" element={ <GuestRoute element={<Register />} /> } />
              <Route path="/" element={ <GuardedRoute element={<ChatWindow />} /> } />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
