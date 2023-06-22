import styles from '~/styles/Mypage/AccountModal.module.scss';
import { useState } from 'react';
import { linkAccount } from '~/api/requests'

const AccountModal = ({ bankList, onFormCancel, watch, setWatch, showModal, setShowModal }) => {
  const [bankCode, setBankCode] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isChecked, setIsChecked] = useState(true);

  const bankCodeHandle = (e) => {
    e.preventDefault();
    setBankCode(e.target.value);
  }

  const accountNumberhandle = (e) => {
    e.preventDefault();
    setAccountNumber(e.target.value);
  }

  const phoneNumberhandle = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  }

  const enrollAccount = async (e) => {
    e.preventDefault();
    const body = {
      bankCode: bankCode,
      accountNumber: accountNumber,
      phoneNumber: phoneNumber,
      signature: true,
    }
    const res = await linkAccount(body);
    console.log('계좌 연결 정보', res);
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
          {banklist.map((bank, idx) => (
            <li 
              key={bank.code}
              onClick={()=>setBankCode(bank.code)}
              >
              <img src={`/public/assets/bank/bank${bank.code}.svg`} />
              <p>{bank.name}</p>
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
                value={bankCode}
                onChange={bankCodeHandle}
                placeholder='은행을 선택해 주세요.'
                autoFocus/>
            </label>
            <label className={styles.label}>
              <span>계좌 번호</span>
              <input 
              type='text'
              name='accountNumber'
              value={accountNumber}
              onChange={accountNumberhandle}
              placeholder='계좌번호를 입력해 주세요.'
              />
            </label>
            <label>
              <span>전화 번호</span>
              <input 
                type='text'
                name='phoneNumber'
                value={phoneNumber}
                onChange={phoneNumberhandle}
                placeholder='전화번호를 입력해 주세요.'
                />
            </label>
            <div className={styles.agreementCheck}>
              <label htmlFor='signature'></label> 
              <input 
                type='checkbox'
                id='signature'
                name='signature'
                checked={true}
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

const banklist= [
  {
    "name": "KB국민은행",
    "code": "004",
    "digits": [3, 2, 4, 3],
    "disabled": false
  },
  {
    "name": "신한은행",
    "code": "088",
    "digits": [3, 3, 6],
    "disabled": true
  },
  {
    "name": "우리은행",
    "code": "020",
    "digits": [4, 3, 6],
    "disabled": true
  },
  {
    "name": "하나은행",
    "code": "081",
    "digits": [3, 6, 5],
    "disabled": false
  },
  {
    "name": "케이뱅크",
    "code": "089",
    "digits": [3, 3, 6],
    "disabled": false
  },
  {
    "name": "카카오뱅크",
    "code": "090",
    "digits": [4, 2, 7],
    "disabled": false
  },
  {
    "name": "NH농협은행",
    "code": "011",
    "digits": [3, 4, 4, 2],
    "disabled": false
  }
]