import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Artisan from "./pages/Artisan";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categorie/:slug", element: <Category /> },
      { path: "/artisan/:slug", element: <Artisan /> },
      { path: "*", element: <NotFound /> }
    ],
  },
]);
