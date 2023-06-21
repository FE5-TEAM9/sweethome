import { getProduct } from '~/api/requests';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '~/styles/Shop/ShopDetail.module.scss'

const ShopDetail = () => {
  // interface GetProductValue {
  //   id: string
  //   title: string
  //   price: number
  //   description: string
  //   tags: string[]
  //   thumbnail: string | null
  //   photo: string | null
  //   isSoldOut: boolean
  //   reservations: Reservation[]
  //   discountRate: number
  // }
  
  // interface Reservation {
  //   start: string // 예약 시작 시간
  //   end: string // 예약 종료 시간
  //   isCanceled: boolean // 예약 취소 여부
  //   isExpired: boolean // 예약 만료 여부
  // }

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
      const res = await getProduct("6YAglrU9l7yWmqGdvtCQ");
      console.log(res);
      setProduct(res);
    } catch(error) {
      console.log("단일 상품 조회 실패", error)
    }
  }
  


  return (
    <>
      <section className={styles.product}>
        <div className={styles.productImg}>
          <img src={product.photo} alt={product.title} />
        </div>
        <div className={styles.productInfo}>
          <div>
            <p>{product.tags}</p>
            <h2>{product.title}</h2>
            <p>{product.price}원</p>
          </div>
          <div>
            <div>
              <input type="button" value="-" onClick={() => setCount(count - 1)} />
              {count}
              <input type="button" value="+" onClick={() => setCount(count + 1)} />
            </div>
            <div>
              <p>총 금액</p>
              {product.price * count}
            </div>
          </div>
          <div className={styles.buttons}>
            <input type="button" value="BUY NOW" className={styles.btn} />
            <input type="button" value="CART" className={styles.btn} />
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopDetail