import styles from '~/styles/Mypage/Account.module.scss'
import { SlClose } from 'react-icons/sl'
import { deleteAccount } from '~/api/requests'
import { useState } from 'react'
import { convertPrice } from '~/utils/convert'
const Account = ({ item, watch, setWatch }) => {
  const [deletItem, setDeleteItem ] = useState('');
  
  // 계좌 해지
  const deleteAcountHandler = async (id) => {
    const body ={
      accountId: id,
      signature: true
    }
    try {
      const res = await deleteAccount(body);
      console.log('계좌 삭제',res)
      setWatch(!watch)
    } catch (error) {
      alert('계좌 해지 실패하였습니다.')
    }
  }

  return (
    <div className={styles.account} >
      <div className={styles.wrapper} >
        <div className={styles.account_details}>
          <h4>{item.bankName}</h4>
          <p>{item.accountNumber}</p>
          <span>{`잔액: ${convertPrice(item.balance)}원`}</span>
        </div>
        <SlClose className={styles.deleteBtn} onClick={()=>deleteAcountHandler(item.id)} />
      </div>
    </div>
  )
}

export default Account