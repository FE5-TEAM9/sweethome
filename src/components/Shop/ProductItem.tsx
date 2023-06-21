import { Link } from 'react-router-dom'
import styles from "~/styles/Shop/ProductItem.module.scss";

const ProductItem = ({ product }) => {

  // 할인가격 계산
  const discountPrice = (productPrice: number, productDiscount: number) => {
    return productPrice * ((100 - productDiscount) / 100)
  }

  return (
    <li className={styles.productContainer}>
        <div className={styles.productPhotoBox}>
          <Link to="#">
            <img src={product.thumbnail} />
          </Link>
        </div>
        <div className={styles.productInfo}>
          <Link to="#">
            <strong className={styles.productName}>{product.title}</strong>
            <p>{product.description}</p>
          </Link>
        </div>
        <div className={styles.productPriceBox}>
          <p className={styles.priceDiscount}>{product.discountRate}</p>
          <strong className={styles.productPrice}>{discountPrice(product.price, product.discountRate)}</strong>
          <p className={styles.priceThrough}>{product.price}</p>
        </div>
    </li>
  );
};

export default ProductItem;
