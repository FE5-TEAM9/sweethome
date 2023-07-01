import { useState } from 'react';
import { linkAccount } from '~/api/requests';
import Loading from '~/components/common/Loading';
import styles from '~/styles/Mypage/AccountModal.module.scss';

interface AccountModalProps {
  bankList: Bank[];
  watch: boolean;
  setWatch: React.Dispatch<React.SetStateAction<boolean>>
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>

}

interface Bank { // 선택 가능한 은행 정보
  name: string // 은행 이름
  code: string // 은행 코드
  digits: number[] // 은행 계좌 자릿수
  disabled: boolean // 사용자가 추가한 계좌 여부
}

interface InputState {
  input0: string;
  input1: string;
  input2: string;
  input3: string;
  phone0: string;
  phone1: string;
  phone2: string;
}

const AccountModal = ({ 
  bankList, 
  watch, 
  setWatch, 
  showModal, 
  setShowModal 
}: AccountModalProps) => {
  const [bankCode, setBankCode] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [bankIDX, setBankIDX] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [accountInput, setAccountInput] = useState<InputState>({
    input0: '',
    input1: '',
    input2: '',
    input3: '',
    phone0: '',
    phone1: '',
    phone2: ''
  })

  // Input onChange Handler
  const accountOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAccountInput({
      ...accountInput,
      [name]: value
    })
}

  // 계좌 등록
  const enrollAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      bankCode,
      accountNumber: accountInput.input0 + accountInput.input1 + accountInput.input2+ accountInput.input3,
      phoneNumber: accountInput.phone0+ accountInput.phone1 + accountInput.phone2,
      signature: isAgree,
    }
    const res = await linkAccount(body);
    if (res) {
      console.log('계좌 연결 정보', res);
      alert('계좌가 연결되었습니다.');
      setShowModal(!showModal);
      setWatch(!watch)
    } else alert('계좌 정보를 다시 확인해 주세요.')
    setIsLoading(false);
  }

  return (
    <>
    {isLoading ? <Loading /> : null}
    <section className={styles.accountModal}>
      <form>
        <div className={styles.title}>
          <h4>계좌 연결</h4>
        </div>
          <ul className={styles.paymentContainer}>
          {bankList.map((bank, idx) => (
            <li 
              key={bank.code}              
              onClick={()=>{
                  setBankIDX(idx);
                  setBankCode(bank.code);
               }}
              >
              <img src={`/assets/bank/bank${bank.code}.svg`} />
              <p >{bank.name}</p>
            </li>
            )
          )}
          </ul>
          { bankCode ? null : <p className={styles.guide}>은행을 선택해 주세요.</p>}
         <div className={styles.infoWrap}>
            <label>
              <span>은행 코드</span>
              <input 
                type='text'
                name='bankCode'  
                defaultValue={bankCode}
                autoFocus/>
            </label>
            <label>
              <span>계좌 번호</span>
              {bankList[bankIDX].digits.map((item, i) => (
                  <input
                    key={i} 
                    type='text'
                    name={`input${i}`}
                    onChange={accountOnChangeHandler} 
                    placeholder={`${item}자리`}
                    maxLength={item}
                    />
                )
              )}
            </label>
            <label>
              <span>전화 번호</span>
              {[3, 4, 4].map((num, i) => (
              <input
                key={i} 
                type='text' 
                name={`phone${i}`} 
                onChange={accountOnChangeHandler}
                placeholder={`${num}자리`} 
                maxLength={num} 
                />
                ))}
            </label>
          </div>
          <div className={styles.agreementCheck}>
              <label htmlFor='signature'></label> 
              <input 
                type='checkbox'
                id='signature'
                name='signature'
                onChange={()=>setIsAgree(!isAgree)}
                />
              <p>위 약관에 동의합니다.</p>
            </div>
          <div className={styles.btnWrap}>
            <button 
              className={styles.btn}
              onClick={()=>setShowModal(false)}
            >취소</button>
            <button 
              type='button'
              onClick={enrollAccount}
              disabled={isLoading}
              className={`${styles.btn} ${styles.registrationBtn}`}>등록</button>
          </div>
      </form>
    </section>
    </>

  )
}

export default AccountModal
