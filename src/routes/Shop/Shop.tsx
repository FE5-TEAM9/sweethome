import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

  const categorys = [ "ALL", "FURNITURE", "KITCHEN", "BEDROOM" ];
  const [click, setClick] = useState(false);


  const clickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    setClick(!click)
  }

  const categoryHandler = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target.value === "ALL") {
      setAllProducts(originalProducts)
    } else if (e.target.value === "FURNITURE") {
      setAllProducts(originalProducts.filter(product => product.tags === "furniture"))
    } else if (e.target.value === "KITCHEN") {
      setAllProducts(originalProducts.filter(product => product.tags === "kitchen"))
    } else if (e.target.value === "BEDROOM") {
      setAllProducts(originalProducts.filter(product => product.tags === "bedroom"))
    }
  }

  return (
    <>
      <section className={styles.shop}>
        <div className={styles.menuWrap}>
          <ul className={styles.menu}>
            <li>
              {categorys.map(category => (
                <input type='button' value={category} onClick={categoryHandler} />
              ))}
            </li>
            {/* <li>
              <input type='button' value="All" />
            </li>
            <li>
              <input
                type='button'
                value="FURNITURE"
                onClick={categoryHandler} />
            </li>
            <li>
              <input type='button' value="KITCHEN" />
            </li>
            <li>
              <input type='button' value="BEDROOM" />
            </li> */}
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