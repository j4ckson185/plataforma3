import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cardapio from "./pages/cardapio/products/Cardapio";
import Perfil from "./pages/perfil";
import Taxes from "./pages/perfil/taxes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/gestor-cardapio",
    element: <Cardapio />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/taxas",
    element: <Taxes />,
  },
]);

export default function PrivateRoute() {
  const { user } = useAuth();

  return user ? <RouterProvider router={router} /> : <LoginPage />;
}
