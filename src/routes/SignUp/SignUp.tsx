
import { useState } from 'react';
import { signUp } from '~/api/requests';
import styles from '~/styles/SignUp.module.scss';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(e.target.value);
  }

  const onDisplayNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  }
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const onConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  }

  const onAgreeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked){setIsAgree(!isAgree)}
  }

  const onSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert ('비밀번호가 일치하지 않습니다.')
    }
    if (!isAgree) {
      return alert('이용약관 및 개인정보수집에 동의해 주세요!')
    }

    let body = {
      email: email,
      displayName: displayName,
      password: password,
    }

    try {
      setIsLoading(true);
      isAgree && await signUp(body);
      setIsLoading(false);
    } catch (error) {
      console.log('SignUp Error', error)
    }
  }


    
 
  return (
    <>
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.inner}>
            <div className={styles.title}>
              <h2>회원가입</h2>
            </div>
            <form>
              <div className={styles.infoList}>
                <label
                  htmlFor="email"
                  className={styles.label}
                >
                  <input
                    value={email}
                    onChange={onEmailHandler}
                    type="text"
                    id="email"
                    className={styles.input}
                    placeholder='이메일'
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label
                  htmlFor="displayName"
                  className={styles.label}
                >
                  <input
                    value={displayName}
                    onChange={onDisplayNameHandler}
                    type="text"
                    id="displayName"
                    className={styles.input}
                    placeholder='이름'
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label
                  htmlFor="password"
                  className={styles.label}
                >
                  <input
                    value={password}
                    onChange={onPasswordHandler}
                    type="password"
                    id="password"
                    className={styles.input}
                    placeholder='비밀번호'
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label
                  htmlFor="password-check"
                  className={styles.label}
                >
                  <input
                    value={confirmPassword}
                    onChange={onConfirmHandler} 
                    type="password"
                    id="password-check"
                    className={styles.input}
                    placeholder='비밀번호 확인'
                  />
                </label>
              </div>
              <div className={styles.agree}>
                <label className={styles.checkBox}>
                  <input
                    type='checkbox'
                    onChange={onAgreeHandler}
                    checked={isAgree}
                  />
                  <p>이용약관 및 개인정보수집, 쇼핑정보 수신에 모두 동의합니다.</p>
                </label>
                <div className={styles.agreeContainer}>
                  <div className={styles.agreeText}>
                    <p>1. 개인정보의 수집항목 및 수집 방법</p>
                    <p>
                      통계청 나라통계 사이트에서는 기본적인 회원 서비스 제공을 위한
                      필수정보로 실명인증정보와 가입정보로 구분하여 다음의 정보를 수집하고 있습니다.
                      필수 정보를 입력해주셔야 회원 서비스 이용이 가능합니다.
                    </p>
                    <p>가. 수집하는 개인정보의 항목</p>
                    <p>-가입정보: 이메일, 이름, 비밀번호</p>
                  </div>
                </div>
              </div>
              <button
                onClick={onSubmitHandler} 
                className={styles.btn}
                disabled={isLoading ? true : false}
                >
                회원가입
              </button>
            </form>
          </div>
        </div>
    </section>
    </>
  )
}

export default SignUp