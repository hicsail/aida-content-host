import "./App.css";
import { Chatbot } from "./components/ChatBot";
import { withEmbedding } from "./hoc/withEmbedding";

function App() {
  const SecuredChatBot = withEmbedding(Chatbot);

  return <SecuredChatBot />;
}

export default App;
