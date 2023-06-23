import styles from '~/styles/Mypage/Account.module.scss'
import { TiDeleteOutline } from 'react-icons/ti'
import { deleteAccount } from '~/api/requests'
import { useState } from 'react'

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

  // 금액 단위 표시
  const convertPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className={styles.account} >
      <div className={styles.wrapper} >
        <div className={styles.account_details}>
          <h4>{item.bankName}</h4>
          <p>{item.accountNumber}</p>
          <span>{`잔액: ${convertPrice(item.balance)}원`}</span>
        </div>
        <TiDeleteOutline className={styles.deleteBtn} onClick={()=>deleteAcountHandler(item.id)} />
      </div>
    </div>
  )
}

export default Account