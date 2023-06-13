import { Outlet } from 'react-router-dom'
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'


export default function Layout() {
  return (
    <>
      <TheHeader/>
      <Outlet />
      <TheFooter />
    </>
  )
}