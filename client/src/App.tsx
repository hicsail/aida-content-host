import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
// import { withEmbedding } from "./hoc/withEmbedding";
import { Chatbot } from "./components/ChatBot";
import { BrowseDocs } from "./components/BrowseDocs/BrowseDocs";

function App() {
  // const SecuredChatBot = withEmbedding(Chatbot);
  // const SecuredBrowseDocs = withEmbedding(BrowseDocs);

  const router = createBrowserRouter([
    {
      path: "chat",
      element: <Chatbot />,
    },
    {
      path: "browse",
      element: <BrowseDocs />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
