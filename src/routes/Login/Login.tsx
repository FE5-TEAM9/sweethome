import styles from "~/styles/Login.module.scss";
import { useState } from "react";
import { signIn } from "~/api/requests";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let body = {
    email: email,
    password: password
  };

  return (
    <>
      <section className={styles.login}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <h2>로그인</h2>
            <form onSubmit={e => signIn(e, body)}>
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
            <button className={styles.btn__signup}>회원가입</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
