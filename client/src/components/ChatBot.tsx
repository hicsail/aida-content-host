import { FC, useState } from "react";
import { IconButton, Paper, TextField, Box, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

export const Chatbot: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const newMessages = [...messages, { text: message, sender: "user" }];
      newMessages.push({ text: "This is a default reply.", sender: "bot" });
      setMessages(newMessages);
      setMessage("");
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
      {!open && (
        <IconButton
          onClick={handleToggle}
          sx={{
            backgroundColor: "#c00",
            color: "white",
            p: 2,
            "&:hover": { backgroundColor: "maroon" },
          }}
        >
          <ChatIcon />
        </IconButton>
      )}
      {open && (
        <Paper
          elevation={4}
          sx={{
            width: 400,
            height: 500,
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: 0,
            right: 0,
            border: "2px solid maroon",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 1,
              bgcolor: "#c00",
              color: "white",
            }}
          >
            <Typography variant="h6">AI Chatbot</Typography>
            <IconButton onClick={handleToggle} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              p: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  maxWidth: "80%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  bgcolor: msg.sender === "user" ? "#c00" : "grey.300",
                  color: msg.sender === "user" ? "white" : "black",
                  textAlign: "left",
                  p: 1,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <Typography>{msg.text}</Typography>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              py: 1.5,
              px: 1,
              borderTop: "1px solid lightgrey",
              backgroundColor: "grey.100",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{ backgroundColor: "white" }}
            />
            <IconButton
              onClick={handleSendMessage}
              sx={{
                ml: 1,
                bgcolor: "#c00",
                color: "white",
                "&:hover": { backgroundColor: "maroon" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
