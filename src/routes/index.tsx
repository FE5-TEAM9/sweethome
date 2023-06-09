import { createBrowserRouter } from 'react-router-dom'
import Home from '~/routes/Home/Home'
import About from '~/routes/About/About'
import Shop from '~/routes/Shop/Shop'
import ShopDetail from '~/routes/Shop/ShopDetail'
import Board from '~/routes/Board/Board'
import Login from '~/routes/Login/Login'
import SignUp from '~/routes/SignUp/SignUp'

export default createBrowserRouter([
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
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
])