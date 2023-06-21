import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '~/styles/Shop/ShopDetail.module.scss'

const ShopDetail = () => {
  const [product, setProduct] = useState({});

  


  return (
    <>
      <section className={styles.product}>
        <div className={styles.productImg}>
          <img src="" alt="" />
        </div>

      </section>
    </>
  )
}

export default ShopDetail