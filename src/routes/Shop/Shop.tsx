import { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '~/api/requests';
import ProductItem from '~/components/Shop/ProductItem';
import styles from '~/styles/Shop/Shop.module.scss'

const Shop = () => {
  type ResponseValue = GetProduct[]

  interface GetProduct {
    id: string
    title: string
    price: number
    description: string
    tags: string[]
    thumbnail: string | null
    isSoldOut: boolean
    discountRate: number
  }

  const [allProducts, setAllProducts] = useState<ResponseValue>([]);
  const [originalProducts, setOriginalProducts] = useState();
  const [click, setClick] = useState(false);

  useEffect(() => {
    spreadAllProducts();
  }, [])

  useEffect(() => {
  }, [allProducts])

  const spreadAllProducts = async () => {
    try {
      const res = await getAllProducts();
      setAllProducts(res);
      setOriginalProducts(res);
      console.log('전체 상품 정보', res);
    } catch (error) {
      console.log('상품 불러오기 실패', error);
    }
  }

  // 상품 카테고리
  const categorys = [ "ALL", "FURNITURE", "KITCHEN", "BEDROOM" ];

  // 상품 카테고리별 필터 기능
  const categoryHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target.value === "ALL") {
      setAllProducts(originalProducts)
      // clickHandler()
    } else if (e.target.value === "FURNITURE") {
      setAllProducts(originalProducts.filter(product => product.tags === "furniture"))
      // clickHandler()
    } else if (e.target.value === "KITCHEN") {
      setAllProducts(originalProducts.filter(product => product.tags === "kitchen"))
      // clickHandler()
    } else if (e.target.value === "BEDROOM") {
      setAllProducts(originalProducts.filter(product => product.tags === "bedroom"))
      // clickHandler()
    }
  }

  // const clickHandler = () => {
  //   setClick(!click);
  // }

  return (
    <>
      <section className={styles.shop}>
        <div className={styles.menuWrap}>
          <ul className={styles.menu}>
            <li>
              {categorys.map(category => (
                <input
                  type='button'
                  value={category}
                  onClick={categoryHandler}
                  className={click ? styles.active : ''}
                />
              ))}
            </li>
          </ul>
          {/* <ul>
            <li>가격 높은 순</li>
            <li>가격 낮은 순</li>
          </ul> */}
        </div>
        <div className={styles.productListWrap}>
          <ul className={styles.productList}>
            {allProducts.map((product)=> (
              <ProductItem product={product} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Shop