import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TfiClose } from "react-icons/tfi";
import { convertPrice, priceBeforeDiscount } from "~/utils/convert";
import styles from "~/styles/Cart/CartList.module.scss";

const CartList = () => {
  const cart = useSelector((state: any) => state.cart);
  const selectedCart = useSelector((state: any) => state.selectedCart);
  const myCart = [...cart];
  const mySelectedCart = [...selectedCart];
  const dispatch = useDispatch();

  // 장바구니 삭제
  const deleteCartItemHandler = (i: number, item: any) => {
    myCart.splice(i, 1);

    dispatch({ type: "RETURN_CART", items: myCart });
    dispatch({
      type: "DELETE_SELECTED_CART",
      items: mySelectedCart.filter(obj => obj.id !== item.id)
    });
    return cart;
  };

  const checkedCartItemHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    e.target.checked
      ? dispatch({ type: "CHECKED_SELECTED_CART", items: item })
      : dispatch({
          type: "DELETE_SELECTED_CART",
          items: mySelectedCart.filter(obj => obj.id !== item.id)
        });
  };

  useEffect(() => {
    dispatch({ type: "REFRESH" });
  }, []);

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
              onChange={e => checkedCartItemHandler(e, item)}
            />
            <Link
              to={`/sweethome/shop/${item.id}`}
            >
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
                    priceBeforeDiscount(item.price, item.discount) * item.quantity)
              }원
            </div>
            <div className={styles.deleteBtn}>
              <TfiClose onClick={() => deleteCartItemHandler(i, item)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
