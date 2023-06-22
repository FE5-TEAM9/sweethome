import styles from '~/styles/Mypage/AccountModal.module.scss';
import { useState } from 'react';
import { linkAccount } from '~/api/requests'

const AccountModal = ({ bankList, onFormCancel, watch, setWatch, showModal, setShowModal }) => {
  const [bankCode, setBankCode] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  const [bankIDX, setBankIDX] = useState(0)
  const [bankDetails, setBankDetails] = useState({
    bankCode: '',
    accountNumber: '',
    phoneNumber: ''
  })

  const {accountNumber, phoneNumber} = bankDetails;

  const onChangeHandler = (e) => {
      const { value, name } = e.target;

      setBankDetails({
        ...bankDetails,
        [name]: value
      })
  }

  // 계좌 등록
  const enrollAccount = async (e) => {
    e.preventDefault();
    const body = {
      bankCode,
      accountNumber,
      phoneNumber,
      signature: isAgree,
    }
    const res = await linkAccount(body);
      console.log('계좌 연결 정보', res);
      alert('계좌가 연결되었습니다.');
      setShowModal(!showModal);
      setWatch(!watch)
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
        <div className={styles.infoWrap}>
            <label className={styles.label}>
              <span>은행 코드</span>
              <input 
                type='text'
                name='bankCode'  
                defaultValue={bankCode}
                placeholder='은행을 선택해 주세요.'
                autoFocus/>
            </label>
            <label className={styles.label}>
              <span>계좌 번호</span>
              <input 
              type='text'
              name='accountNumber'
              value={accountNumber}
              onChange={onChangeHandler}
              placeholder='계좌번호를 입력해 주세요.'
              />
            </label>
            <div className={styles.accountNumber}>
              {bankList[bankIDX].digits.map((item) => {
                return (
                  <input type='text' maxLength={item} />
                )
              })}
            </div>

            <label>
              <span>전화 번호</span>
              <input 
                type='text'
                name='phoneNumber'
                value={phoneNumber}
                onChange={onChangeHandler}
                placeholder='전화번호를 입력해 주세요.'
                />
            </label>
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
