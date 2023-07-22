import { createBrowserRouter } from "react-router-dom";
import App from "~/App";
import Home from "~/routes/Home/Home";
import About from "~/routes/About/About";
import Shop from "~/routes/Shop/Shop";
import ShopDetail from "~/routes/Shop/ShopDetail";
import MyPage from "~/routes/MyPage/MyPage";
import Cart from "~/routes/Cart/Cart";
import Login from "~/routes/Login/Login";
import SignUp from "~/routes/SignUp/SignUp";
import Admin from "~/routes/Admin/Admin";
import Buy from "~/routes/Buy/Buy";
import NotFound from "~/routes/NotFound/NotFound";

export default createBrowserRouter([
  {
    path: "/sweethome",
    element: <App />,
    children: [
      {
        path: "/sweethome",
        element: <Home />
      },
      {
        path: "/sweethome/about",
        element: <About />
      },
      {
        path: "/sweethome/shop",
        element: <Shop />
      },
      {
        path: "/sweethome/shop/:id",
        element: <ShopDetail />
      },
      {
        path: "/sweethome/mypage",
        element: <MyPage />
      },
      {
        path: "/sweethome/cart",
        element: <Cart />
      },
      {
        path: "/sweethome/login",
        element: <Login />
      },
      {
        path: "/sweethome/signup",
        element: <SignUp />
      },
      {
        path: "/sweethome/admin",
        element: <Admin />
      },
      {
        path: "/sweethome/buy",
        element: <Buy />
      }
    ]
  },
  {
    path: "/sweethome/*",
    element: <NotFound />
  }
]);
