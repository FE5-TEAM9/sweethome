import styles from "~/styles/Login.module.scss";

const Login = () => {
  return (
    <>
      <section className={styles.login}>
        <h2 className={styles.login__title}>로그인</h2>
        <div className={styles.login__form}>
          <div className={styles.input__id}>
            <span>ID</span>
            <input type="text" />
          </div>
          <div className={styles.input__pwd}>
            <span>PW</span>
            <input type="text" />
          </div>
          <button className={styles.btn__login}>로그인</button>
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
