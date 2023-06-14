import styles from '~/styles/Shop.module.scss'
import ProductItem from '~/components/Shop/ProductItem';

const Shop = () => {
  const products = [
    {
      name: "플랜트팟 유리 미니 꽃병",
      price: 40500,
      discount: "10%"
    },
    {
      name: "플랜트팟 유리 미니 꽃병",
      price: 40500,
      discount: "10%"
    },
  ]
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
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
            <ProductItem/>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Shop