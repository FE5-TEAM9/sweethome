import { useEffect, useState } from 'react'
import styles from '~/styles/Mypage/AccountList.module.scss'
import Account from '../../components/MyPage/Account/Account'
import AccountModal from '../../components/MyPage/Account/AccountModal'
import { getBankList, getAccountList, linkAccount, deleteAccount } from '~/api/requests'

const AccountList = () => {
const [showModal, setShowModal] = useState(false)
const [bankList, setBankList] = useState([])
const [accountList, setAccountList] = useState([])
const [watch, setWatch] = useState(false)

useEffect(() => {
  checkBankList();
  checkAccountList();
},[watch])

// 모달창 취소 Handler
const onFormCancel = () => {
  setShowModal(false);
}

//선택 가능한 은행 목록 조회
const checkBankList = async () => {
  try {
    const res = await getBankList();
    setBankList(res);
    console.log(res);
  } catch (error) {
    console.log('은행 목록 오류', error);
    alert('은행 정보를 불러오는 데 실패하였습니다.');
  }
}

//등록된 계좌 조회
const checkAccountList = async () => {
  try {
    const res = await getAccountList();
    setAccountList(res);
    console.log('등록된 계좌 정보',res);
  } catch (error) {
    alert('계좌 정보 불러오는 데 실패하였습니다.')
  }
}

  return (
    <>
    {showModal && (<AccountModal 
      bankList={bankList} 
      onFormCancel={onFormCancel} 
      watch={watch}
      setWatch={setWatch}
      showModal={showModal}
      setShowModal={setShowModal}
      />
      )}
      <section className={styles.accountList}>
        <div className={styles.accountListContainer}>
            <div className={styles.title}>
              <h2>계좌 관리</h2>
            </div>
            {accountList.accounts.length
            ? (accountList.accounts.map((item)=> {
                return (
                  <Account 
                    item={item} 
                    watch={watch}
                    setWatch={setWatch}
                    />)}))
            : (
              <div className={styles.noAccount}>
                <div className={styles.textWrap}>
                  <p>등록된 계좌가 없습니다.</p>
                  <p>계좌 번호를 등록해 주세요!</p>
                </div>
              </div>
            )}        
          <button
            className={styles.btn}
            onClick={()=>setShowModal(!showModal)}
            >
            계좌 연결
          </button>
          </div>
      </section>
    </>
  )
}

export default AccountList