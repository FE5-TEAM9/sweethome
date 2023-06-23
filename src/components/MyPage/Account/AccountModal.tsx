import styles from '~/styles/Mypage/AccountModal.module.scss';
import { useState } from 'react';
import { linkAccount } from '~/api/requests'


const AccountModal = ({ bankList, onFormCancel, watch, setWatch, showModal, setShowModal }) => {
  const [bankCode, setBankCode] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [bankIDX, setBankIDX] = useState(0)
  const [accuontInput, setAccuontInput] = useState({
    input0: '',
    input1: '',
    input2: '',
    input3: '',
    sumAccountNum: function() {
      return this.input0 + this.input1 + this.input2 + this.input3;
    },
    phone0: '',
    phone1: '',
    phone2: '',
    sumPhoneNum: function() {
      return this.phone0 + this.phone1 + this.phone2;
    }
  })

  const accountOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setAccuontInput({
      ...accuontInput,
      [name]: value
    })
}

  // 계좌 등록
  const enrollAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const body = {
      bankCode,
      accountNumber: accuontInput.sumAccountNum(),
      phoneNumber: accuontInput.sumPhoneNum(),
      signature: isAgree,
    }
    const res = await linkAccount(body);
    if (res) {
      console.log('계좌 연결 정보', res);
      alert('계좌가 연결되었습니다.');
      setShowModal(!showModal);
      setWatch(!watch)
    } else alert('계좌 정보를 다시 확인해 주세요.')
  
  }

  return (
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
              <img src={`/public/assets/bank/bank${bank.code}.svg`} />
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
              {bankList[bankIDX].digits.map((item, i) => {
                return (
                  <input
                    key={i} 
                    type='text'
                    name={`input${i}`}
                    onChange={accountOnChangeHandler} 
                    maxLength={item}
                    />
                )
              })}
            </label>
            <label>
              <span>전화 번호</span>
              {[3, 4, 4].map((num, i) => { return (
              <input
                key={i} 
                type='text' 
                name={`phone${i}`} 
                onChange={accountOnChangeHandler} 
                maxLength={num} 
                />
                )})}
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
              onClick={onFormCancel}
            >취소</button>
            <button 
              type='button'
              onClick={enrollAccount}
              className={`${styles.btn} ${styles.registrationBtn}`}>등록</button>
          </div>
      </form>
    </section>
  )
}

export default AccountModal
