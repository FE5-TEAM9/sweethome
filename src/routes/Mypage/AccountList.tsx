import { useState } from 'react'
import styles from '~/styles/Mypage/AccountList.module.scss'
import Account from '../../components/MyPage/Account/Account'
import AccountModal from '../../components/MyPage/Account/AccountModal'

const AccountList = () => {
const [showModal, setShowModal] = useState(false)

  return (
    <>
    {showModal && (<AccountModal/>)}
      <section className={styles.accountList}>
        <div className={styles.accountListContainer}>
          <div className={styles.accountListWrapper}>
            <div className={styles.title}>
              <h2>계좌 관리</h2>
            </div>
            <Account />
            <div className={styles.noAccount}>
              <div className={styles.textWrap}>
                <p>등록된 계좌가 없습니다.</p>
                <p>계좌 번호를 등록해 주세요!</p>
              </div>
            </div>
          
          <button
            className={styles.btn}
            onClick={()=>setShowModal(!showModal)}
            >
            계좌 연결
          </button>
          </div>
        </div>
      </section>
    </>

    
  )
}

export default AccountList