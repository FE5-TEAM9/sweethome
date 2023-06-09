import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <TheHeader />
    <RouterProvider router={router} />
    <TheFooter />
  </>
)
