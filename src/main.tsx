import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingComponent from "./components/LandingComponent.tsx";
import SearchComponent from "./components/SearchComponent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingComponent />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/search",
    element: <SearchComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
