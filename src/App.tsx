import { Outlet, useLocation } from 'react-router-dom'
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'
import { useCallback, useEffect } from 'react'
import { authenticate } from '~/api/requests'


export default function Layout() {
const location = useLocation();

  useEffect(()=> {
    authenticateHandler();
  }, [location])

  const authenticateHandler = useCallback(async () => {
    try {
      const res = await authenticate()
      console.log('로그인 인증', res)
      
    } catch (err) {
      console.error('로그인 인증 오류',err)
    }
  }, [location])

  return (
    <>
      <TheHeader/>
      <Outlet />
      <TheFooter />
    </>
  )
}