import { getProduct } from '~/api/requests';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '~/styles/Shop/ShopDetail.module.scss'

const ShopDetail = () => {
  
  const { id } = useParams();
  console.log(`현재 페이지의 파라미터는 ${id} 입니다.`)

  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);

  useEffect(() => {
    getProductHandler(id);
  }, [])

  // 단일 상품 조회
  const getProductHandler = async (id: string) => {
    try {
      const res = await getProduct("wtDJ1EsIyRwI38ToD8Fi");
      console.log("단일 상품 조회", res);
      setProduct(res);
    } catch(error) {
      console.log("단일 상품 조회 실패", error)
    }
  }
  
  // 할인가격 계산
  const discountPrice = (productPrice: number, productDiscount: number) => {
    return productPrice * ((100 - productDiscount) / 100)
  }

  return (
    <>
      <section className={styles.product}>
        <div className={styles.productImg}>
          <img src={product.photo} alt={product.title} />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productText}>
            <p className={styles.tags}>{product.tags}</p>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.discountPrice}>{discountPrice(product.price, product.discountRate)}원</p>
            <div className={styles.price}>
              <span className={styles.originalPrice}>{product.price}원</span>
              <span className={styles.discountRate}>
                { product.discountRate
                  ? `${product.discountRate}%`
                  : ""
                }
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
                onClick={() => setCount(count - 1)}
              />
              <span>{count}</span>
              <input
                type="button"
                value="+"
                className={styles.minusBtn}
                onClick={() => setCount(count + 1)}
              />
            </div>
            <div className={styles.countPrice}>
              <p>총 금액</p>
              <span>
                {product.discountRate !== 0
                    ? discountPrice(product.price, product.discountRate) * count
                    : product.price * count
                }
                원
              </span>
            </div>
          </div>
          <div className={styles.buttons}>
            <input type="button" value="BUY NOW" className={`${styles.btn} ${styles.buy}`} />
            <input type="button" value="CART" className={`${styles.btn} ${styles.cart}`} />
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopDetail