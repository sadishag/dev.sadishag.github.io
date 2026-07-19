import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.jsx";
import BlogPost from "./components/BlogPost.jsx";

// Vite's BASE_URL is "/" locally and "/dev.sadishag.github.io/" on the QA
// deployment; React Router wants it without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/+$/, "") || "/";

export const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    { path: "/blog/:slug", element: <BlogPost /> },
    { path: "*", element: <Navigate to="/" replace /> },
  ],
  { basename }
);
