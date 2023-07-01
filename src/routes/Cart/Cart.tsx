import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEquals, FaPlus } from "react-icons/fa";
import { convertPrice } from "~/utils/convert";
import CartList from "~/components/Cart/CartList";
import styles from "~/styles/Cart/Cart.module.scss";

const Cart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('로그인을 해주세요! 🏠');
      navigate('/sweethome/login');
    }
  },[])


  const select = useSelector((state: any) => state.selectedCart);
  const cart = useSelector((state: any) => state.cart);

  const total = [...select];

  const totalQuantity = total.reduce((acc, cur) => (acc += cur.quantity), 0);
  const totalProductPrice = total.reduce((acc, cur) => (acc += cur.price), 0);
  const totalPrice = totalProductPrice;
  
  useEffect(() => {}, [total]);

  return (
    <>
    {localStorage.getItem('token') ?
      <section className={styles.cart}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>장바구니</h2>
          </div>
          <div className={styles.list_nav}>
            <div className={styles.list_nav_container}>
              <div></div>
              <div>상품 이미지</div>
              <div>상품명</div>
              <div>수량</div>
              <div>가격</div>
              <div>총 금액</div>
              <div></div>
            </div>
          </div>
          <div className={styles.list_container}>
            {cart.length ? (
              <CartList />
            ) : (
              <p>장바구니에 담긴 상품이 없습니다.</p>
            )}
          </div>
          <div className={styles.total_price}>
            <div className={styles.total_price_container}>
              <strong>{`총 ${totalQuantity}개의 상품`}</strong>
              <span>₩{convertPrice(totalProductPrice)}</span>
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
          <div className={styles.buttons}>
            <input
              type="button"
              value="선택 상품 주문"
              className={`${styles.btn} ${styles.btn_selected}`}
              onClick={() => navigate("/sweethome/buy", { state: select })}
            />
            <input
              type="button"
              value="전체 상품 주문"
              className={`${styles.btn} ${styles.btn_selectedAll}`}
              onClick={() => navigate("/sweethome/buy", { state: cart })}
            />
          </div>
        </div>
      </section>
      : <div></div>
      }
    </>
  );
};

export default Cart;
