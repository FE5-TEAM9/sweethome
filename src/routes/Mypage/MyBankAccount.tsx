import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBankList, getAccountList } from '~/api/requests';
import Account from '~/components/MyPage/MyBankAccount/Account';
import AccountModal from '~/components/MyPage/MyBankAccount/AccountModal';
import Loading from '~/components/common/Loading';
import styles from '~/styles/Mypage/MyBankAccount.module.scss';

interface Bank { 
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

const MyBankAccount = () => {
  const [showModal, setShowModal] = useState(false)
  const [bankList, setBankList] = useState([])
  const [accountList, setAccountList] = useState<Bank[]>([])
  const [watch, setWatch] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    checkBankList();
    checkAccountList();
  },[watch])


  // 선택 가능한 은행 목록 조회
  const checkBankList = async () => {
    setIsLoading(true);
    try {
      const res = await getBankList();
      setBankList(res);
    } catch (error) {
      alert('은행 정보를 불러오는 데 실패하였습니다.');
    }
    setIsLoading(false);
  }

  // 등록된 계좌 조회
  const checkAccountList = async () => {
    setIsLoading(true);
    try {
      const res = await getAccountList();
      setAccountList(res.accounts);
      dispatch({ type: "GET_ACCOUNT_LIST", accountList: res });
    } catch (error) {
      alert('계좌 정보 불러오는 데 실패하였습니다.')
    }
    setIsLoading(false);
  }

  return (
    <>
    {isLoading? <Loading/>: null}
    {showModal && (<AccountModal 
      bankList={bankList} 
      // onFormCancel={onFormCancel} 
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
            {accountList.length > 0
            ? (accountList.map((item, i: number)=> (
                  <Account
                    key={i} 
                    item={item} 
                    watch={watch}
                    setWatch={setWatch}
                    />)))
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

export default MyBankAccount