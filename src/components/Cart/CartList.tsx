import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "~/styles/Cart/CartList.module.scss";

const CartList = () => {
  const cart = useSelector(state => state.cart);
  const myCart = [...cart]
  const dispatch = useDispatch();
  console.log(cart);

  // 할인가격 계산
  const discountPrice = (productPrice: number, productDiscount: number) => {
    return productPrice * ((100 - productDiscount) / 100);
  };

  // 금액 단위 표시
  const convertPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 장바구니 삭제
  const deleteCartItemHandler = (i: number) => {
    myCart.splice(i, 1)
    dispatch({ type: "RETURN_CART", items: myCart});
    return cart;
  };
  useEffect(() => {}, [cart]);
  console.log(cart);
  return (
    <div className={styles.cartList}>
      <ul className={styles.container}>
        {myCart.map((item, i: number) => (
          <li
            className={styles.cartItem}
            key={i}>
            <input
              type="checkbox"
              className={styles.checkbox}
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
                    discountPrice(item.price, item.discountRate) * item.quantity
                  )
                : convertPrice(item.price * item.quantity)}
              원
            </div>
            <input
              type="button"
              value="삭제"
              onClick={() => deleteCartItemHandler(i)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
