import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { Chatbot } from "./components/ChatBot";
import { withEmbedding } from "./hoc/withEmbedding";
import { BrowseDocs } from "./components/BrowseDocs/BrowseDocs";

function App() {
  const SecuredChatBot = withEmbedding(Chatbot);
  const SecuredBrowseDocs = withEmbedding(BrowseDocs);

  const router = createBrowserRouter([
    {
      path: "chat",
      element: <SecuredChatBot />,
    },
    {
      path: "browse",
      element: <SecuredBrowseDocs />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
