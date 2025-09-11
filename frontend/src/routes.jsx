import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import NotFound from "./components/NotFound.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CartPage from "./pages/CartPage.jsx";
import { useContext } from "react";
import { AppContext } from "./context/appContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";

function Router() {
  const { auth, isTokenExpired } = useContext(AppContext)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <HomePage /> },
        { 
          path: "/login",
          element: !auth ? <LoginPage /> : <Navigate to="/"/> ,
        },
        {
          path: "/register",
          element:  !auth ? <RegisterPage /> : <Navigate to="/"/>,
        },
        {
          path: "/products",
          element:  <ProductsPage /> ,
        },
        {
          path: "/products/:id",
          element:  <SingleProductPage /> ,
        },
        {
          path: "/cart",
          element:  auth && !isTokenExpired ? <CartPage /> : <Navigate to="/"/> ,
        },
        {
          path: "/profile",
          element:  auth && !isTokenExpired ? <ProfilePage /> : <Navigate to="/"/> ,
        },
        {
          path: "/dashboard",
          element: auth && auth.isAdmin && !isTokenExpired ? <Dashboard /> : <Navigate to ='/' />,
        },
        {
          path: "/users/:userId/verify/:token",
          element: <VerifyEmail />,
        },
        { path: "/*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
