import { createBrowserRouter } from 'react-router-dom'
import Home from './Home'
import About from './About'

export default createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
])