import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '~/api/requests';
import SubNav from '~/components/common/SubNav';
import MyInfo from "~/routes/Mypage/MyInfo";
import AccountList from "~/routes/Mypage/MyBankAccount";
import Transactions from '~/routes/Mypage/MyOrder';
import styles from '~/styles/Mypage/Mypage.module.scss';


const MyPage = () => {
  const user = useSelector((state:any) => state.user)
  const navigate = useNavigate();
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState(false);

  const subNav: string[]  = ["주문 내역 관리", "계좌 정보 관리", "개인 정보 관리"];
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('로그인을 해주세요! 🏠');
      navigate('/sweethome/login');
    }
  },[])

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmitPasswordConfirm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      email: user.email,
      password,
    };

    try {
      const res = await logIn(body);
      if (res) {
        setPasswordConfirm(true);
      } else {
        alert('비밀번호가 일치하지 않습니다.')
      }
    } catch (error: any) {
      alert(error.message)
    }
    
  };

  return (
        <>
        {localStorage.getItem('token') ?
          <div className={styles.mypage}>
            <SubNav subNav={subNav} setCategory={setCategory} />
            {(category === "주문 내역 관리" || category === "" ) && <Transactions />}
            {category === "계좌 정보 관리" && <AccountList/>}
            {category === "개인 정보 관리"  && (!passwordConfirm?   
            <section className={styles.myPageConfirm}>
                  <div className={styles.wrapper}>
                    <div className={styles.title}>
                      <h2>개인 정보 수정</h2>
                    </div>
                      <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해 주세요!</p>
                      <form className={styles.form} onSubmit={handleSubmitPasswordConfirm}>
                        <div className={styles.formWrap}>
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
                </section>         
            : <MyInfo />)
            }
          </div>
        : <div></div>
        }
      </>
  )

}

export default MyPage
