import { Link } from 'react-router-dom'
import styles from "~/styles/ProductItem.module.scss";
import img1 from '~/assets/products/bedroom1.jpeg'

const ProductItem = () => {
  return (
    <li className={styles.productContainer}>
        <div className={styles.productPhotoBox}>
          <Link to="#">
            <img src={img1} />
          </Link>
        </div>
        <div className={styles.productInfo}>
          <Link to="#">
            <strong className={styles.productName}>상품이름</strong>
            <p>더닷 감정으로 풀어낸 소품</p>
          </Link>
        </div>
        <div className={styles.productPriceBox}>
          <p className={styles.priceDiscount}>5%</p>
          <strong className={styles.productPrice}>₩54,150</strong>
          <p className={styles.priceThrough}>₩57,000</p>
        </div>
    </li>
  );
};

export default ProductItem;
