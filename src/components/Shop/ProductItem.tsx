import { Link } from "react-router-dom";
import styles from "~/styles/Shop/ProductItem.module.scss";

const ProductItem = ({ product }) => {
  // 할인가격 계산
  const discountPrice = (productPrice: number, productDiscount: number) => {
    return productPrice * ((100 - productDiscount) / 100);
  };

  // 금액 단위 표시
  const convertPrice = (price: number) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Link to={product.id}>
      <li className={styles.productContainer}>
        <div className={styles.productPhotoBox}>
          <img src={product.thumbnail} />
        </div>
        <div className={styles.productInfo}>
          <strong className={styles.productName}>{product.title}</strong>
          {/* <p>{product.description}</p> */}
        </div>
        <div className={styles.productPriceBox}>
          <p className={styles.priceDiscount}>
            {product.discountRate ? `${product.discountRate}%` : ""}
          </p>
          <strong className={styles.productPrice}>
            ₩{convertPrice(discountPrice(product.price, product.discountRate))}
          </strong>
          <p className={styles.priceThrough}>
            {product.discountRate ? `₩${convertPrice(product.price)}` : ""}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default ProductItem;
