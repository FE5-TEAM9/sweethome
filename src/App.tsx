import { useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authenticate } from '~/api/requests';
import TheHeader from '~/components/common/TheHeader';
import TheFooter from '~/components/common/TheFooter';
import '~/App.scss';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch()

  useEffect(()=> {
    authenticateHandler();
  }, [location])

  const authenticateHandler = useCallback(async () => {
    try {
      const res = await authenticate()
      dispatch({ type: "RETURN_USER", payload: res })
    } catch (err) {
      console.log("로그인 인증 실패하였습니다.")
    }
  }, [location])

  return (
    <>
      <TheHeader/>
      <div className="allSections">
        <Outlet />
      </div>
      <TheFooter />
    </>
  )
};

export default App;