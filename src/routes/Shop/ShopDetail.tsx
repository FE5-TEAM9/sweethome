import { getProduct } from "~/api/requests";
import { priceBeforeDiscount, convertPrice } from "~/utils/convert";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "~/styles/Shop/ShopDetail.module.scss";

const ShopDetail = () => {
  interface GetProductValue {
    id: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    thumbnail: string | null;
    photo: string | null;
    isSoldOut: boolean;
    reservations: Reservation[];
    discountRate: number;
  }

  interface Reservation {
    start: string; // 예약 시작 시간
    end: string; // 예약 종료 시간
    isCanceled: boolean; // 예약 취소 여부
    isExpired: boolean; // 예약 만료 여부
  }

  const { id } = useParams();
  const navigate = useNavigate();

  const globalCart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const [product, setProduct] = useState<GetProductValue>({});
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getProductHandler(id);
  }, []);

  // 단일 상품 조회
  const getProductHandler = async (id: string) => {
    try {
      const res = await getProduct(id);
      console.log("단일 상품 조회", res);
      setProduct(res);
    } catch (error) {
      console.log("단일 상품 조회 실패", error);
    }
  };

  // 상품 수량 계산
  const productCountHandler = (type: String) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  // 장바구니 중복 처리
  const cartDuplicationHandler = (id: string, quantity: number) => {
    const found = globalCart.filter(el => el.id === id)[0];
    const idx = globalCart.indexOf(found);
    const cartItem = {
      id: product.id,
      title: product.title,
      price: priceBeforeDiscount(product.price, product.discountRate),
      discountPrice: product.price,
      quantity: quantity,
      description: product.description,
      tags: product.tags,
      thumbnail: product.thumbnail,
      photo: product.photo,
      isSoldOut: product.isSoldOut,
      reservations: product.reservations,
      discountRate: product.discountRate,
      isChecked: false
    };
    dispatch({
      type: "RETURN_CART",
      items: [
        ...globalCart.slice(0, idx),
        cartItem,
        ...globalCart.slice(idx + 1)
      ]
    });
  };

  // 장바구니 핸들러
  const cartHandler = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: priceBeforeDiscount(product.price, product.discountRate),
      discountPrice: product.price,
      quantity: count,
      description: product.description,
      tags: product.tags,
      thumbnail: product.thumbnail,
      photo: product.photo,
      isSoldOut: product.isSoldOut,
      reservations: product.reservations,
      discountRate: product.discountRate,
      isChecked: false
    };
    const found = globalCart.find(el => el.id === cartItem.id);
    if (found) {
      cartDuplicationHandler(cartItem.id, found.quantity + count);
    } else {
      dispatch({ type: "RETURN_CART", items: [...globalCart, cartItem] });
    }
    confirm("장바구니를 확인하시겠습니까?");
  };
  console.log("globalCart", globalCart);

  return (
    <>
      <section className={styles.product}>
        <div className={styles.productImg}>
          <img
            src={product.photo}
            alt={product.title}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productText}>
            <p className={styles.tags}>{product.tags}</p>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.discountPrice}>
              {convertPrice(product.price)}
              원
            </p>
            <div className={styles.price}>
              <span className={styles.originalPrice}>
                {convertPrice(priceBeforeDiscount(product.price, product.discountRate))}원
              </span>
              <span className={styles.discountRate}>
                {product.discountRate ? `${product.discountRate}%` : ""}
              </span>
            </div>
            <p className={styles.description}>{product.description}</p>
          </div>
          <div className={styles.productCount}>
            <div className={styles.countBox}>
              <input
                type="button"
                value="-"
                className={styles.plusBtn}
                onClick={() => productCountHandler("minus")}
              />
              <span>{count}</span>
              <input
                type="button"
                value="+"
                className={styles.minusBtn}
                onClick={() => productCountHandler("plus")}
              />
            </div>
            <div className={styles.countPrice}>
              <p>총 금액</p>
              <span>
                {product.discountRate !== 0
                  ? convertPrice(product.price * count)
                  : convertPrice(priceBeforeDiscount(product.price, product.discountRate) * count)
                }
                원
              </span>
            </div>
          </div>
          <div className={styles.buttons}>
            <input
              type="button"
              value="BUY NOW"
              className={`${styles.btn} ${styles.buy}`}
              // onClick={() => { navigate('/cart')} }
            />
            <input
              type="button"
              value="CART"
              className={`${styles.btn} ${styles.cart}`}
              onClick={() => cartHandler()}
              // onClick={() => { navigate('/cart')} }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetail;
