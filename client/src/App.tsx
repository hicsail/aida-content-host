import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
// import { withEmbedding } from "./hoc/withEmbedding";
import { Chatbot } from "./components/ChatBot";
import { BrowseDocs } from "./components/BrowseDocs/BrowseDocs";
import { RootLayout } from "./pages/Root";
import { TopicModel } from "./pages/TopicModel";

function App() {
  // const SecuredChatBot = withEmbedding(Chatbot);
  // const SecuredBrowseDocs = withEmbedding(BrowseDocs);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="chat" element={<Chatbot />} />
        <Route path="/" element={<RootLayout />}>
          <Route path="browse" element={<BrowseDocs />} />
          <Route path="topic-model/:topic" element={<TopicModel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
