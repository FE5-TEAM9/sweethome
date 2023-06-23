import { useState } from "react";
import CartList from "~/components/Cart/CartList";
import styles from "~/styles/Cart/Cart.module.scss";

const Cart = () => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  return (
    <>
      <section className={styles.cart}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>장바구니</h2>
          </div>
          <div className={styles.list_container}>
            <CartList />
            {/* <p>장바구니에 담긴 상품이 없습니다.</p> */}
          </div>
          <div className={styles.total_price}>
            <div className={styles.total_price_container}>
              <strong>총 0개의 상품</strong>
              <span>₩74,000</span>
              <div className={styles.plus}>+</div>
              <strong>배송비</strong>
              <span>₩3,500</span>
              <div className={styles.equal}>=</div>
              <strong>합계</strong>
              <span>₩77,500</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              value="선택 상품 주문"
              className={`${styles.btn} ${styles.btn_selected}`}
            />
            <input
              type="button"
              value="전체 상품 주문"
              className={`${styles.btn} ${styles.btn_selectedAll}`}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
