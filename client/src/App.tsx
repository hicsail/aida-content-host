import "./App.css";
import { Chatbot } from "./components/ChatBot";
import { withDomainCheck } from "./hoc/withDomainCheck";

function App() {
  const SecuredChatBot = withDomainCheck(Chatbot);

  return <SecuredChatBot />;
}

export default App;
