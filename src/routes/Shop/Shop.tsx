import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '~/api/requests';
import ProductItem from '~/components/Shop/ProductItem';
import styles from '~/styles/Shop/Shop.module.scss'

const Shop = () => {
  type ResponseValue = GetProduct[]

  interface GetProduct { // 제품 정보
    id: string // 제품 ID
    title: string // 제품 이름
    price: number // 제품 가격
    description: string // 제품 설명(최대 100자)
    tags: string[] // 제품 태그
    thumbnail: string | null // 제품 썸네일 이미지(URL)
    isSoldOut: boolean // 제품 매진 여부
    discountRate: number // 제품 할인율
  }

  const [allProducts, setAllProducts] = useState<ResponseValue>([]);

  useEffect(() => {
    spreadAllProducts();
  }, [])

  const spreadAllProducts = async () => {
    try {
      const res = await getAllProducts();
      setAllProducts(res);
      console.log('전체 상품 정보', res);
    } catch (error) {
      console.log('상품 불러오기 실패');
    }
  }
  // const category = [ "All", "FURNITURE", "KITCHEN", "BEDROOM" ];
  // const [click, setClick] = useState(false);


  // const clickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
  //   setClick(!click)
  // }

  // const categoryHandler = (e) => {
  //   if (All 눌렀어) {
  //     ...모든
      
  //   } else if (Furni) {
  //     상품들.filter(tag => tag.name === FUrniture)
  //   }
  // }

  

  return (
    <>
      <section className={styles.shop}>
        <div className={styles.menuWrap}>
          <ul className={styles.menu}>
            <li>
              <input type='button' value="All" />
            </li>
            <li>
              <input type='button' value="FURNITURE" />
            </li>
            <li>
              <input type='button' value="KITCHEN" />
            </li>
            <li>
              <input type='button' value="BEDROOM" />
            </li>
          </ul>
        </div>
        <div className={styles.productListWrap}>
          <ul className={styles.productList}>
            {allProducts.map((product)=> (
              <Link to={product.id}>
                <ProductItem product={product} />
              </Link>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Shop