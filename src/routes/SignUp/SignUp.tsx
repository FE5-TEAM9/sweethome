import { useState } from 'react'
import { signUp } from '~/api/requests'

import styles from '~/styles/SignUp.module.scss'

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")

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
                    type="email"
                    id="email"
                    className={styles.input}
                    placeholder='이메일'
                  />
                </label>
              </div>
              <div className={styles.infoList}>
                <label
                  htmlFor="name"
                  className={styles.label}
                >
                  <input 
                    type="name"
                    id="name"
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
                    type="password-check"
                    id="password-check"
                    className={styles.input}
                    placeholder='비밀번호 확인'
                  />
                </label>
              </div>
              <div className={styles.agree}>
                <label className={styles.checkBox}>
                  <input type='checkbox' />
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
              <button className={styles.btn}>회원가입</button>
            </form>
          </div>
        </div>
    </section>
    </>
  )
}

export default SignUp