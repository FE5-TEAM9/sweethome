import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEquals, FaPlus } from "react-icons/fa";
import CartList from "~/components/Cart/CartList";
import styles from "~/styles/Cart/Cart.module.scss";
import selectedCart from "~/reducers/selectedCart";
import { convertPrice } from "~/utils/convert";

const Cart = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const select = useSelector((state: any) => state.selectedCart);
  const cart = useSelector((state: any) => state.cart);

  const total = [...select];
 
  const totalQuantity = total.reduce((acc, cur) => acc += cur.quantity, 0)
  const totalProductPrice = total.reduce((acc, cur) => acc += cur.discountPrice, 0)
  const totalPrice = totalProductPrice + 3500;

  useEffect(() => {

  }, [total])
  
  return (
    <>
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
            {
              cart.length
                ? <CartList />
                : <p>장바구니에 담긴 상품이 없습니다.</p>
            }
          </div>
          <div className={styles.total_price}>
            <div className={styles.total_price_container}>
              <strong>{`총 ${totalQuantity}개의 상품`}</strong>
              <span>₩{convertPrice(totalProductPrice)}</span>
              <div className={styles.plus}>
                <FaPlus />
              </div>
              <strong>배송비</strong>
              <span>₩3,500</span>
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
              onClick={() => navigate("/buy", { state: select })}
            />
            <input
              type="button"
              value="전체 상품 주문"
              className={`${styles.btn} ${styles.btn_selectedAll}`}
              onClick={() => navigate("/buy", { state: cart })}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
