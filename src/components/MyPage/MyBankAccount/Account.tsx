import { SlClose } from 'react-icons/sl';
import { deleteAccount } from '~/api/requests';
import { convertPrice } from '~/utils/convert';
import styles from '~/styles/Mypage/Account.module.scss';

interface AccountProps {
  item: Bank;
  watch: boolean;
  setWatch: React.Dispatch<React.SetStateAction<boolean>>;
}
interface Bank {
  id: string 
  bankName: string 
  bankCode: string 
  accountNumber: string 
  balance: number 
}

const Account = ({ 
  item, watch, setWatch 
}: AccountProps) => {
  
  // 계좌 해지
  const deleteAcountHandler = async (id: string) => {
    const body ={
      accountId: id,
      signature: true
    }
    try {
      await deleteAccount(body);
      alert("해당 계좌가 삭제되었습니다.")
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

export default Account;