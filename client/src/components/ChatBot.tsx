import { FC, useEffect, useRef, useState } from "react";
import { IconButton, Paper, TextField, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

export const Chatbot: FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      const newMessages = [...messages, { text: message, sender: "user" }];
      setMessages(newMessages);
      setMessage("");

      try {
        const resposne = await fetch(`${import.meta.env.VITE_CHATBOT_URL}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: message }),
        });

        const data = await resposne.json();

        setMessages((prevMessages) => [...prevMessages, { text: data.answer, sender: "bot" }]);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box>
      {!open && (
        <IconButton
          onClick={handleToggle}
          sx={{
            backgroundColor: "#c00",
            color: "white",
            p: 2,
            "&:hover": { backgroundColor: "darkred" },
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
            height: 600,
            display: "flex",
            flexDirection: "column",
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
            <div ref={messagesEndRef} />
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
