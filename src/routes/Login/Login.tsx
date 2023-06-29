import { useState } from "react";
import { logIn } from "~/api/requests";
import styles from "~/styles/Login/Login.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.info);
  const navigate = useNavigate();

  const loginHandler = async (e: any) => {
    e.preventDefault();

    let body = {
      email: email,
      password: password
    };

    try {
      const res = await logIn(body);
      console.log("로그인 정보", res);
      switch (res) {
        case false:
          dispatch({ type: "LOGOUT", state: false });
          break;
        case (res[user][email] === "admin@sweethome.com"):
          navigate("/admin")
          break;
        default:
          dispatch({ type: "LOGOUT", state: true });
          break;
      }
      dispatch({ type: "RETURN", account: res });
      console.log("user", user.user);
      navigate("/")
    } catch (err) {
      console.log("로그인 오류", err);
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
                className={styles.btn__login}>
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
            <Link to="/signup">
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
