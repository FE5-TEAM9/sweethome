import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEquals, FaPlus } from "react-icons/fa";
import { buyProduct, getAccountList } from "~/api/requests";
import { convertPrice, priceBeforeDiscount } from "~/utils/convert";
import styles from "~/styles/Buy/Buy.module.scss";

interface Bank {
  id: string;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  balance: number;
}

const Buy = () => {
  const user = useSelector((state: any) => state.user);
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountChecked, setAccountChecked] = useState(true);
  const [bankChecked, setBankChecked] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [bankName, setBankName] = useState("")
  const [accountList, setAccountList] = useState<Bank[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getAccountData();
  }, []);

  const getAccountData = async () => {
    try {
      const res = await getAccountList();
      setAccountList(res.accounts);
    } catch (err) {
      alert("계좌정보 실패하였습니다.");
    }
  };

  // 라디오 버튼 핸들러
  const radioBtnHandler = () => {
    setAccountChecked(!accountChecked);
    setBankChecked(!bankChecked);
  };
  const location = useLocation();
  const order = [...location.state];

  const totalQuantity = order.reduce((acc, cur) => (acc += cur.quantity), 0);
  const totalPrice = order.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0
  );

  // 상품 거래 신청 핸들러
  interface orderApplyBody {
    productId: string;
    accountId: string;
    reservation?: {
      start: string;
      end: string;
    };
  }

  const orderApplyHandler = async (
    e: React.MouseEvent<HTMLInputElement>,
    order: any[],
    accountId: string
  ) => {
    e.preventDefault();
    try {
      order.map(async (item: any) => {
        const body: orderApplyBody = {
          productId: item.id,
          accountId
        };
        await buyProduct(body);
      });
      if (confirm("결제가 완료되었습니다.\n주문 내역을 확인하시겠습니까?")) {
        navigate("/sweethome/mypage");
      } else {
        return;
      }
      order.map((item: any) => {
        dispatch({ type: "GETBUYITEM", items: item.id });
      });
      dispatch({
        type: "RETURN_CART",
        items: cart.filter((item: any) => {
          return !order.includes(item);
        })
      });
    } catch (error) {
      console.log("결제 실패", error);
      alert("상품 주문에 실패했습니다.");
    }
  };

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
              {order.map((item, i: number) => (
                <li
                  className={styles.cartItem}
                  key={i}>
                  <Link to={`/sweethome/shop/${item.id}`}>
                    <div className={styles.itemImg}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                      />
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
                      {item.discountRate !== 0
                        ? `${convertPrice(item.price)}원`
                        : `${convertPrice(
                            priceBeforeDiscount(item.price, item.discountRate)
                          )}원`}
                    </span>
                    <span className={styles.originalPrice}>
                      {item.discountRate !== 0
                        ? `${convertPrice(
                            priceBeforeDiscount(item.price, item.discountRate)
                          )}원`
                        : ""}
                    </span>
                  </div>
                  <div className={styles.totalPrice}>
                    {item.discountRate !== 0
                      ? convertPrice(item.price * item.quantity)
                      : convertPrice(
                          priceBeforeDiscount(item.price, item.discountRate) *
                            item.quantity
                        )}
                    원
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.total_price}>
            <div className={styles.total_price_container}>
              <strong>총 {totalQuantity}개의 상품</strong>
              <span>₩{convertPrice(totalPrice)}</span>
              <div className={styles.plus}>
                <FaPlus />
              </div>
              <strong>배송비</strong>
              <span>₩0</span>
              <div className={styles.equal}>
                <FaEquals />
              </div>
              <strong>합계</strong>
              <span>₩{convertPrice(totalPrice)}</span>
            </div>
          </div>

          <div className={styles.customer}>
            <h4>주문자 정보</h4>
            <div className={styles.customer_container}>
              <div className={styles.name}>
                <span>주문자명:</span>
                <span>{user.displayName}</span>
              </div>
              <div className={styles.email}>
                <span>이메일:</span>
                <span>{user.email}</span>
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
                  &nbsp;가상 계좌
                </label>
                <label>
                  <input
                    type="radio"
                    name="credit"
                    value="account"
                    checked={bankChecked}
                    onChange={() => radioBtnHandler()}
                  />
                  &nbsp;무통장 입금
                </label>
              </div>
              {accountChecked ? (
                <div className={styles.account}>
                  {accountList.length ? (
                    accountList.map(account => (
                      <div
                        key={account.id}
                        className={
                          isActive
                            ? `${styles.account_info} active`
                            : `${styles.account_info}`
                        }
                        onClick={() => {
                          setAccountId(account.id); 
                          setBankName(account.bankName);
                          setIsActive(true)
                          }}>
                        <div>{account.bankName}</div>
                        <div>{account.accountNumber}</div>
                        <div>잔액: {convertPrice(account.balance)}원</div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noAccount}>
                      계좌를 먼저 등록해주세요.
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.bank}>
                  <p>입금은행 </p>
                  <p>국민은행 123-4565-11234</p>
                  <p>예금주: (주)집가구싶어</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.payment_details}>
            <h4>최종 결제 금액</h4>
            <div className={styles.details_container}>
              <span>₩{convertPrice(totalPrice)}</span>
              {bankName ? (<p>{bankName}에서 총 {convertPrice(totalPrice)}원 결제 예정입니다.</p>) : null}
            </div>
          </div>
        </div>
        <div className={styles.payment_btn}>
          <input
            type="button"
            value="결제하기"
            className={styles.btn}
            onClick={e => orderApplyHandler(e, order, accountId)}
          />
        </div>
      </div>
    </>
  );
};

export default Buy;
