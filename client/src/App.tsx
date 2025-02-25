import { Box, Typography } from "@mui/material";
import "./App.css";
import { Chatbot } from "./components/ChatBot";

function App() {
  const allowedDomains = /\.bu.edu$/;

  if (!allowedDomains.test(window.location.hostname)) {
    console.log("Access Denied");
    return (
      <Box>
        <Typography variant="h1">Access Denied</Typography>
        <Typography variant="body1">
          This chatbot is only accessible from the Boston University domain.
        </Typography>
      </Box>
    );
  }

  return <Chatbot />;
}

export default App;
