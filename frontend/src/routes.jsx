import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import NotFound from "./components/NotFound.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <HomePage/>,
      },
      { 
        path: "/register", 
        element: <RegisterPage /> 
      },
      { 
        path: "/login", 
        element: <LoginPage /> 
      },
      { 
        path: "/products", 
        element: <ProductsPage /> 
      },
      { 
        path: "/products/:id", 
        element: <SingleProductPage /> 
      },
      { 
        path: "/*", 
        element: <NotFound /> 
      },
    ],
  },
]);

export default router;
