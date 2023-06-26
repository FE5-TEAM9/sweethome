import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'
import { useCallback, useEffect, useState } from 'react'
import { authenticate } from '~/api/requests'
import { useDispatch} from "react-redux"


export default function Layout() {
// const [userInfo, setUserInfo] = useState({})
const location = useLocation();
const dispatch = useDispatch()

  useEffect(()=> {
    authenticateHandler();
  }, [location])

  const authenticateHandler = useCallback(async () => {
    try {
      const res = await authenticate()
      console.log('로그인 인증', res)
      dispatch({ type: "RETURN_USER", payload: res })
      // setUserInfo(res)
    } catch (err) {
      console.error('로그인 인증 오류', err)
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