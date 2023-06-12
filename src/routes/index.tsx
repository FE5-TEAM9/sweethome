import { createBrowserRouter } from 'react-router-dom'
import App from '~/App'
import Home from '~/routes/Home/Home'
import About from '~/routes/About/About'
import Shop from '~/routes/Shop/Shop'
import ShopDetail from '~/routes/Shop/ShopDetail'
import Board from '~/routes/Board/Board'
import Mypage from '~/routes/Mypage/Mypage'
import Cart from '~/routes/Cart/Cart'
import Login from '~/routes/Login/Login'
import SignUp from '~/routes/SignUp/SignUp'
import Admin from '~/routes/Admin/Admin'
import Dashboard from '~/routes/Admin/Dashboard'

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/shop',
        element: <Shop />
      },
      {
        path: '/shop/:productId',
        element: <ShopDetail />
      },
      {
        path: '/board',
        element: <Board />
      },
      {
        path: '/mypage',
        element: <Mypage />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/admin',
        element: <Admin />,
        children: [
          {
            path: '/admin/dashboard',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
])