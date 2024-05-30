import React from 'react';
import './App.css';
import {Box} from '@mui/material';
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width={"100%"} sx={{ backdropFilter: "blur(5px)" }}>
          <ChatWindow />
      </Box>
  );
}

export default App;
