import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEquals, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "~/styles/Buy/Buy.module.scss";
import { getAccountList } from "~/api/requests";

const Buy = () => {
  const dispatch = useDispatch();
  // const accountList = useSelector(state => state.accountList)
  const [accountList, setAccountList] = useState([]);
  const [accountChecked, setAccountChecked] = useState(true);
  const [bankChecked, setBankChecked] = useState(false);

  useEffect(() => {
    checkAccountList();
    console.log(accountList);
  },[])

  const checkAccountList = async () => {
    try {
      const res = await getAccountList();
      setAccountList(res);
      dispatch({ type: "GET_ACCOUNT_LIST", accountList: res })
      console.log('등록된 계좌 정보',res);
    } catch (error) {
      alert('계좌 정보 불러오는 데 실패하였습니다.')
    }
  }
  
  console.log("계좌정보 불러오기", accountList)
  
  // 할인가격 계산
  const discountPrice = (productPrice: number, productDicount: number) => {
    return productPrice * ((100 - productDiscount) / 100);
  };

  // 금액 단위 표시
  const convertPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 장바구니 삭제
  const deleteCartItemHandler = (i: number, item: any) => {
    myCart.splice(i, 1);

    dispatch({ type: "RETURN_CART", items: myCart });
    dispatch({
      type: "DELETE_SELECTED_CART",
      items: mySelectedCart.filter((obj) => obj.id !== item.id),
    });
    return cart;
  };

  // 라디오 버튼 핸들러
  const radioBtnHandler = () => {
    setAccountChecked(!accountChecked);
    setBankChecked(!bankChecked);
  }

  const checkedCartItemHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    e.target.checked
      ? dispatch({ type: "CHECKED_BUY_CART", items: item })
      : dispatch({
          type: "DELETE_BUY_CART",
          items: mySelectedCart.filter((obj) => obj.id !== item.id),
        });
  };

  const location = useLocation();

  return (
    <>
      <div className={styles.buy}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>주문서 작성 / 결제</h2>
          </div>

          <div className={styles.list_nav}>
            <h4>주문상세내역</h4>
            <div className={styles.list_nav_container}>
              <div>상품 이미지</div>
              <div>상품명</div>
              <div>수량</div>
              <div>가격</div>
              <div>총 금액</div>
            </div>
          </div>

          <div className={styles.buyList}>
            <ul className={styles.container}>
              {location.state.map((item, i: number) => (
                <li className={styles.cartItem} key={i}>
                  <Link to={`/shop/${item.id}`}>
                    <div className={styles.itemImg}>
                      <img src={item.photo} alt={item.title} />
                    </div>
                  </Link>

                  <div className={styles.itemTitle}>
                    <span>{item.title}</span>
                  </div>
                  <div className={styles.itemQuantity}>
                    <span>{item.quantity}개</span>
                  </div>
                  <div className={styles.itemPrice}>
                    <span className={styles.discountPrice}>
                      {item.discountRate
                        ? `${convertPrice(item.discountPrice)}원`
                        : ""}
                    </span>
                    <span className={styles.originalPrice}>
                      {convertPrice(item.price)}원
                    </span>
                  </div>
                  <div className={styles.totalPrice}>
                    {item.discountRate
                      ? convertPrice(item.discountPrice * item.quantity)
                      : convertPrice(item.price * item.quantity)}
                    원
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.total_price}>
            <div className={styles.total_price_container}>
              <strong>총 개의 상품</strong>
              <span>₩{}</span>
              <div className={styles.plus}>
                <FaPlus />
              </div>
              <strong>배송비</strong>
              <span>₩3,500</span>
              <div className={styles.equal}>
                <FaEquals />
              </div>
              <strong>합계</strong>
              <span>₩{}</span>
            </div>
          </div>

          <div className={styles.customer}>
            <h4>주문자 정보</h4>
            <div className={styles.customer_container}>
              <div className={styles.name}>
                <span>주문자명:</span>
                <span>홍길동</span>
              </div>
              <div className={styles.email}>
                <span>이메일:</span>
                <span>test@test.com</span>
              </div>
            </div>
          </div>

          <div className={styles.credit}>
            <h4>결제 수단</h4>
            <div className={styles.credit_container}>
              <div className={styles.select}>
                <p>결제 수단 선택</p>
                <label>
                  <input
                    type="radio"
                    name="credit"
                    value="bank"
                    checked={accountChecked}
                    onChange={() => radioBtnHandler()}
                  />
                  가상 계좌
                </label>
                <label>
                  <input
                    type="radio"
                    name="credit"
                    value="account"
                    checked={bankChecked}
                    onChange={() => radioBtnHandler()}
                  />
                  무통장 입금
                </label>
              </div>
              { accountChecked
                ? (
                  <div className={styles.account}>
                    {accountList.accounts?.map((account) => (
                      <div key={account.id} className={styles.account_info}>
                        <div>{account.bankName}</div>
                        <div>{account.accountNumber}</div>
                        <div>잔액: {account.balance}</div>
                      </div>
                    ))}
                  </div>
                  )
                : (
                    <div className={styles.bank}>
                      <p>입금은행 </p>
                      <p>국민은행 123-4565-11234</p>
                      <p>예금주: (주)집가구싶어</p>
                    </div>
                  )
              }
            </div>
          </div>

          <div className={styles.payment_details}>
            <h4>결제 상세</h4>
            <div className={styles.details_container}>          
                <strong>주문금액</strong>
                <p>35,000원</p>       
              <div className={styles.plus}>
                <FaPlus />
              </div>                
                <strong>배송비</strong>
                <p>3,500원</p>
              <div className={styles.equal}>
                <FaEquals />
              </div>             
                <strong>결제금액</strong>
                <p>35,000원</p>
            </div>
         
          </div>          
        </div>
        <div className={styles.payment_btn}>
            <input type="button" value="결제하기" className={styles.btn}/>
          </div>
      </div>

      {/* <div className={styles.buyList}>
        <ul className={styles.container}>
          {location.state.map((item: any, i: number) => (
            <li
              className={styles.buyItem}
              key={i}>
              <input
                type="checkbox"
                className={styles.checkbox}
                // onChange={e => checkedCartItemHandler(e, item)}
              />
              <div className={styles.itemImg}>
                <img
                  src={item.photo}
                  alt={item.title}
                />
              </div>
              <div className={styles.itemTitle}>
                <span>{item.title}</span>
              </div>
              <div className={styles.itemQuantity}>
                <span>{item.quantity}개</span>
              </div>
              <div className={styles.itemPrice}>
                <span className={styles.discountPrice}>
                  {item.discountRate
                    ? `${convertPrice(
                        discountPrice(item.price, item.discountRate)
                      )}원`
                    : ""}
                </span>
                <span className={styles.originalPrice}>
                  {convertPrice(item.price)}원
                </span>
              </div>
              <div>
                {item.discountRate
                  ? convertPrice(
                      discountPrice(item.price, item.discountRate) *
                        item.quantity
                    )
                  : convertPrice(item.price * item.quantity)}
                원
              </div>
              <input
                type="button"
                value="삭제"
                // onClick={() => deleteCartItemHandler(i, item)}
              />
            </li>
          ))}
        </ul>
      </div> */}
    </>
  );
};

export default Buy;
