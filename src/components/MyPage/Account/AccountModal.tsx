import styles from '~/styles/Mypage/AccountModal.module.scss';


const AccountModal = () => {
  return (
    <section className={styles.accountModal}>
      <form>
      <div className={styles.title}>
        <h4>계좌 연결</h4>
      </div>
        <div className={styles.paymentContainer}>
          <ul>
          {banklist.map((bank) =>{
           return (
            <li key={bank.code}>
              <button type='button' className={styles.bankBtn}>{bank.name}</button>
            </li>
           )
          })}
          </ul>
        </div>
          <div className={styles.infoWrap}>
          <div className={styles.info}>
            <label htmlFor='bankAccount' className={styles.label}>
              <span>계좌 번호</span>
              <input type='text' id='bankAccount' autoFocus/>
            </label>
          </div>
          <div className={styles.info}>
            <label htmlFor='phoneNumber'>
              <span>전화 번호</span>
              <input type='text' id='phoneNumber'/>
            </label>
          </div>
          <div>
            <label htmlFor='checkBox' className={`${styles.agreementCheck} ${styles.info}`}> 
              <input type='checkbox' id='checkBox'/>
              <p>위 약관에 동의합니다.</p>
            </label>
          </div>
          </div>

          <div className={styles.btnWrap}>
            <button className={styles.btn}>취소</button>
            <button className={`${styles.btn} ${styles.registrationBtn}`}>등록</button>
          </div>
      </form>
    </section>
  )
}

export default AccountModal

const banklist= [
  {
    "name": "KB국민은행",
    "code": "004",
    "digits": [3, 2, 4, 3],
    "disabled": false
  },
  {
    "name": "신한은행",
    "code": "088",
    "digits": [3, 3, 6],
    "disabled": true
  },
  {
    "name": "우리은행",
    "code": "020",
    "digits": [4, 3, 6],
    "disabled": true
  },
  {
    "name": "하나은행",
    "code": "081",
    "digits": [3, 6, 5],
    "disabled": false
  },
  {
    "name": "케이뱅크",
    "code": "089",
    "digits": [3, 3, 6],
    "disabled": false
  },
  {
    "name": "카카오뱅크",
    "code": "090",
    "digits": [4, 2, 7],
    "disabled": false
  },
  {
    "name": "NH농협은행",
    "code": "011",
    "digits": [3, 4, 4, 2],
    "disabled": false
  }
]