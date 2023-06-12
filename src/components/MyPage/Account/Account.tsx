import styles from '~/styles/Account.module.scss'
import { TiDeleteOutline } from 'react-icons/ti'

const Account = () => {
  return (
    <div className={styles.account}>
      <div className={styles.wrapper} key='index'>
        <div className={styles.inner}>
          <h4>국민 은행</h4>
          <p>12345-12-123456</p>
          <span>잔액: 3,000,000원</span>
        </div>
        <TiDeleteOutline className={styles.deleteBtn} />
      </div>
    </div>
  )
}

export default Account