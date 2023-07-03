import { getProduct } from "~/api/requests";
import { priceBeforeDiscount, convertPrice } from "~/utils/convert";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "~/components/common/Loading";
import styles from "~/styles/Shop/ShopDetail.module.scss";

const ShopDetail = () => {
  type Params = {
    id: string | undefined;
  };

  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalCart = useSelector((state: any) => state.cart);

  const [product, setProduct] = useState<any>({});
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProductHandler(id);
  }, []);

  // 단일 상품 조회
  const getProductHandler = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await getProduct(id);
      res["quantity"] = count;
      setProduct(res);
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  // 상품 수량 계산
  const productCountHandler = (type: string) => {
    if (type === "plus") {
      setCount(count + 1);
    } else {
      if (count === 1) return;
      setCount(count - 1);
    }
  };

  // 장바구니 중복 처리
  const cartDuplicationHandler = (id: string, quantity: number) => {
    const found = globalCart.filter((el: any) => el.id === id)[0];
    const idx = globalCart.indexOf(found);
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
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
      price: product.price,
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

    const found = globalCart.find((el: any) => el.id === cartItem.id);

    if (found) {
      cartDuplicationHandler(cartItem.id, found.quantity + count);
    } else {
      dispatch({ type: "RETURN_CART", items: [...globalCart, cartItem] });
    }

    if (confirm("장바구니를 확인하시겠습니까?")) {
      navigate("/sweethome/cart");
    } else return;
  };

  const buyNowHandler = () => {
    if (!localStorage.getItem("token")) {
      alert("로그인이 필요합니다.");
      navigate("/sweethome/login");
    } else {
      navigate("/sweethome/buy", { state: [product] });
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <section className={styles.product}>
        <div className={styles.infoContainer}>
          <div className={styles.productImg}>
            <img
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div className={styles.productInfo}>
            <div className={styles.productText}>
              <p className={styles.tags}>{product.tags}</p>
              <h2 className={styles.title}>{product.title}</h2>
              <p className={styles.discountPrice}>
                {convertPrice(product.price)}원
              </p>
              <div className={styles.price}>
                <span className={styles.originalPrice}>
                  {convertPrice(
                    priceBeforeDiscount(product.price, product.discountRate)
                  )}
                  원
                </span>
                <span className={styles.discountRate}>
                  {product.discountRate ? `${product.discountRate}%` : ""}
                </span>
              </div>
            </div>
            <div className={styles.productCount}>
              <div className={styles.countBox}>
                <input
                  type="button"
                  value="-"
                  className={styles.plusBtn}
                  onClick={() => productCountHandler("minus")}
                />
                <input
                  className={styles.count}
                  name="count"
                  value={count}
                />
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
                    : convertPrice(
                        priceBeforeDiscount(
                          product.price,
                          product.discountRate
                        ) * count
                      )}
                  원
                </span>
              </div>
            </div>
            <div className={styles.buttons}>
              <input
                type="button"
                value="BUY NOW"
                className={`${styles.btn} ${styles.buy}`}
                onClick={() => buyNowHandler()}
              />
              <input
                type="button"
                value="CART"
                className={`${styles.btn} ${styles.cart}`}
                onClick={() => cartHandler()}
              />
            </div>
          </div>
        </div>

        <div className={styles.detailContainer}>
          <div className={styles.detailTitle}>
            <span>상품 상세 정보</span>
          </div>
          <div className={styles.detailDescription}>
            <p>{product.description}</p>
          </div>
          <div>
            <img src={product.photo} alt="" />
          </div>
        </div>
        
      </section>
    </>
  );
};

export default ShopDetail;
