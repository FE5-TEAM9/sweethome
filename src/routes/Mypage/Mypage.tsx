import styles from '~/styles/Mypage/Mypage.module.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { logIn } from '~/api/requests'
import MyInfo from "~/routes/Mypage/MyInfo"
import AccountList from "~/routes/Mypage/AccountList"
import { useOutletContext } from 'react-router-dom'

const MyPage = () => {
const [userInfo] = useOutletContext();
const navigate = useNavigate();
const [email, setEmail] = useState(userInfo.email);
const [password, setPassword] = useState('')
const [passwordConfirm, setPasswordConfirm] = useState(false);


useEffect(() => {
  if (!localStorage.getItem('token')){
    alert('잘못된 접근입니다.')
    navigate('/');
  }
},[])

const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
}

const handleSubmitPasswordConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const body = {
    email,
    password,
  };
  const res = await logIn(body);
    console.log('로그인 성공입니다.', res)
    setPasswordConfirm(true);
  
};

  return !passwordConfirm ? (
    <section className={styles.myPageConfirm}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.title}>
          <h2>개인 정보 수정</h2>
          </div>
          <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해 주세요!</p>
          <form className={styles.form} onSubmit={handleSubmitPasswordConfirm}>
            <div className={styles.formWrap}>
              <input 
                type='hidden' 
                value={email} 
                onChange={e=>setEmail(e.target.value)}
                />
              <div className={styles.PWContaniner}>
                <p>PW</p>
                <input 
                  type="password"
                  name="password"
                  value={password}
                  onChange={onPasswordHandler}
                  className={styles.passwordInput} 
                  autoFocus
                  />
              </div>         
              <button type="submit" className={styles.btn}>확인</button>    
            </div>
          </form>    
        </div>
      </div>
    </section>
  ) : (
    <>
      <MyInfo/>
        <hr />  
      <AccountList/>
    </>

  );
}

export default MyPage
