import styles from '~/styles/Mypage/MyPageConfirm.module.scss'

const MyPageConfirm = () => {
  return (
    <section className={styles.myPageConfirm}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.title}>
          <h2>개인 정보 수정</h2>
          </div>
          <p>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 확인해 주세요!</p>
          <form className={styles.form}>
            <div className={styles.formWrap}>
              <div className={styles.PWContaniner}>
                <p>PW</p>
                <input type='password' className={styles.passwordInput} autoFocus/>
              </div>         
              <button className={styles.btn}>확인</button>    
            </div>
          </form>    
        </div>
      </div>
    </section>
  )
}

export default MyPageConfirm