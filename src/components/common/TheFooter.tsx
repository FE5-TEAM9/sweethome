import styles from '~/styles/TheFooter.module.scss';

const TheFooter = () => {
  return (
    <>
      <footer>
        <div className={styles.container}>
          <ul>
            <li className={styles.logo}>
              <h1>SWEET HOME</h1>
            </li>

            <li className={styles.company}>
              <div>
                <h2>(주)집 가구싶어(SweetHome)</h2>
                <span>상호명: 집 가구싶어(SweetHome)</span>
                <span>사업자등록번호: 123-45-678-91011</span>
                <span>사업자: 김준희, 박근우, 백동은, 송홍빈, 조은상</span>
              </div>
            </li>

            <li className={styles.bank}>
              <div>
                <h2>BANK ACCOUNT</h2>
                <span>국민 562101-01-020304</span>
                <span>농협 111-9876-5432-01</span>
                <span>예금주: (주)집가구싶어</span>
              </div>
            </li>

            <li className={styles.customer}>
              <div>
                <h2>CUSTOMER CENTER</h2>
                <span>평일: 10:00 AM ~ 18:00 PM</span>
                <span>토요일: 13:00 PM ~ 17:00 PM</span>
                <span>(점심시간: 12:00 PM ~ 13:00 PM)</span>
                <span>일요일 및 공휴일은 운영하지 않습니다.</span>
              </div>
            </li>
            
            <li className={styles.tel}>
              <div>
                <h2>Tel. 1234-5678</h2>
              </div>
            </li>
          </ul>

        </div>
      </footer>
    </>
  )
}

export default TheFooter;