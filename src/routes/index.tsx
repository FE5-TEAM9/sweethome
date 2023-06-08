import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import About from './About'
import SignUp from './SignUp'

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
    path: '/sign-up',
    element: <SignUp />
  },
])