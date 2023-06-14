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
        <h2 className={styles.login__title}>로그인</h2>
        <div className={styles.login__form}>
          <form onSubmit={e => signIn(e, body)}>
            <div className={styles.input__id}>
              <span>ID</span>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요."
              />
            </div>
            <div className={styles.input__pwd}>
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
          <div className={styles.login__findaccount}>
            <p>아이디 찾기</p>
            <p>|</p>
            <p>비밀번호 찾기</p>
          </div>
        </div>
        <div className={styles.signup}>
          <p className={styles.signup__notice}>아직 회원이 아니신가요?</p>
          <p className={styles.signup__notice}>
            회원 가입을 하시면 다양하고 특별한 혜택을 누리세요
          </p>
          <button className={styles.btn__signup}>회원가입</button>
        </div>
      </section>
    </>
  );
};

export default Login;
