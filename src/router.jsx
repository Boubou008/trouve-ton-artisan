import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Artisan from "./pages/Artisan";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },

      // 👉 Pages en construction
      { path: "/mentions-legales", element: <ComingSoon /> },
      { path: "/contact", element: <ComingSoon /> },

      { path: "/artisan/:slug", element: <Artisan /> },
      { path: "/categorie/:slug", element: <Category /> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);
