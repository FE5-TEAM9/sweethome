import styles from "~/styles/Shop/ProductItem.module.scss";

const ProductItem = ({ product }) => {

  // 할인가격 계산
  const discountPrice = (productPrice: number, productDiscount: number) => {
    return productPrice * ((100 - productDiscount) / 100)
  }

  return (
    <li className={styles.productContainer}>
        <div className={styles.productPhotoBox}>
          <img src={product.thumbnail} />
        </div>
        <div className={styles.productInfo}>
          <strong className={styles.productName}>{product.title}</strong>
          <p>{product.description}</p>
        </div>
        <div className={styles.productPriceBox}>
          <p className={styles.priceDiscount}>
            { product.discountRate
                ? `${product.discountRate}%`
                : ""
            }
          </p>
          <strong className={styles.productPrice}>{discountPrice(product.price, product.discountRate)}</strong>
          <p className={styles.priceThrough}>
            { product.discountRate
              ? product.price
              : ""
            }
          </p>
        </div>
    </li>
  );
};

export default ProductItem;
