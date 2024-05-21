import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginComponent from "./components/LoginComponent.tsx";
import ProfileComponent from "./components/ProfileComponent.tsx";
import HomeComponent from "./components/HomeComponent.tsx";
import LandingComponent from "./components/LandingComponent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingComponent />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/profile",
    element: <ProfileComponent />,
  },
  {
    path: "/home",
    element: <HomeComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
