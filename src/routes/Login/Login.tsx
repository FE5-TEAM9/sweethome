import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "~/api/requests";
import styles from "~/styles/Login/Login.module.scss";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();

    let body = {
      email: email,
      password: password
    };

    try {
      const res = await logIn(body);
      if (res) {
        if (res.user.email === import.meta.env.VITE_ADMIN_ACCOUNT) {
          navigate("/sweethome/admin");
          dispatch({ type: "RETURN", account: res });
          dispatch({ type: "LOGOUT", state: true });
        } else {
          navigate("/sweethome")
          dispatch({ type: "RETURN", account: res });
          dispatch({ type: "LOGOUT", state: true });
        }
      } else {
        dispatch({ type: "LOGOUT", state: false });
        alert("로그인 실패하였습니다.")
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <section className={styles.login}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <h2>로그인</h2>
            <form onSubmit={loginHandler}>
              <div className={styles.id}>
                <span>ID</span>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요."
                />
              </div>
              <div className={styles.pwd}>
                <span>PW</span>
                <input
                  type="password"
                  value={password}
                  placeholder="비밀번호를 입력하세요."
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={styles.btn__login}
              >
                로그인
              </button>
            </form>
            <div className={styles.find}>
              <p>아이디 찾기</p>
              <p>|</p>
              <p>비밀번호 찾기</p>
            </div>
          </div>
          <div className={styles.signup}>
            <p>아직 회원이 아니신가요?</p>
            <p>회원 가입을 하시면 다양하고 특별한 혜택을 누리세요</p>
            <Link to="/sweethome/signup">
              <button type="button" className={styles.btn__signup}>
                회원가입
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
