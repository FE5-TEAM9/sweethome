import styles from "~/styles/Cart/Cart.module.scss";
const Cart = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>

      <div className={styles.cart_title_wrap}>
        <div className={styles.tab_title}>
          <input type="checkbox" />
          <span>상품정보</span>
          <span>수량</span>
          <span>상품금액</span>

          <p className={styles.tab_title_5}>전체선택</p>
        </div>
      </div>

      <section className={styles.cart_product_list}>
        <input type="checkbox" />
        <div className={styles.cart_product_wrap}>
          <div className={styles.cart_product_image}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQmUA3Z58_o6YhADl9AFdQN-wMvKbIrGGfrw&usqp=CAU"
              alt="product-img"
            />
          </div>

          <div className={styles.cart_product_info}>
            <p className={styles.seller_store}>상품 이름</p>
            <p className={styles.product_name}>상품 설명</p>
            <p className={styles.price}>1000원</p>
            <p className={styles.delivery}>택배배송 / 무료배송</p>
          </div>
        </div>

        <div className={styles.cart_product_count}>
          <img
            className={styles.minus}
            src="https://cdn.icon-icons.com/icons2/950/PNG/512/minus-gross-horizontal-straight-line-symbol_icon-icons.com_74137.png"
            alt="minus"
          />

          <div className={styles.count}>
            <span>2</span>
          </div>
          <img
            className={styles.plus}
            src="https://cdn.icon-icons.com/icons2/933/PNG/512/add-plus-button_icon-icons.com_72878.png"
            alt="plus"
          />
        </div>

        <div className={styles.cart_product_price}>
          <p className={styles.total_price}></p>
          <button className={styles.btn_submit}>결제하기</button>
        </div>

        <div className={styles.product_remove}>
          <img
            src="https://svgsilh.com/svg/150831.svg"
            alt="delete"
          />
        </div>
      </section>
      <div className={styles.total}>
        <div className={styles.total_price}>
          <p className={styles.cart_product_total_price}>총 상품금액</p>
          <p className={styles.cart_product_price}>0</p>
        </div>
        <div className={styles.pay_minus}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhIoAupYzd1JbO027ohlPps9B9gjD34rAUlA&usqp=CAU"
            alt="minus"
          />
        </div>
        <div className={styles.sale}>
          <p className={styles.cart_product_sale}>상품 할인</p>
          <p className={styles.cart_product_sale_price}>0원</p>
        </div>
        <div className={styles.pay_plus}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAACampqvr6/8/PwEBASUlJSCgoKoqKienp7u7u56enppaWm1tbXU1NS8vLyLi4vQ0NDk5OQeHh719fUlJSVHR0czMzOkpKTExMQsLCza2tp+fn5ubm5eXl50dHSxACKxAAACsUlEQVR4nO3c6W7bMBBFYdGh9yXektp12rz/W1ZyESSxGKQa0R1e4Xw/C5SYA6mVLcBTVQAAAAAAAAAAT9F7gDuomy6TpxDCYbvznuUuYrV/Dm9+XLzHuYdZ+GjiPU5+8/DZdGj/Fnfh1npIhXVKCOPbxKP3WFmdWpcwhK33UFm1LmDDe6icFqnAsPEeK6N1O6++qjPvsTJ6SBaOvMfKKFEYKNRCoT4K9VGoj0J9FOqjUB+F+ijUR6E+CvVRqI9CfRTqo1Afhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGoj0J9FOqjUB+FbmLM9IPyVOE4zPMc3m/G+m8v1g99rZepwLDKcPK+X2JM/8y8LKNe17C9CcEk+Vv1L/+4s0f7FbzdZVGqqelGrf+TmX1/diGM6xn2zX2U6066M8vyglg9f39wMQ6WS3jxnvrf1Tfa2VA48Z67k1dD4U/vobsxFHqP3FHs/sTwHrkjw8Yi75E7aB5phmf+k/fc3XQPrLbeM3eyMhRm+tT9n5g+fes8LsbGrVpCH2pMH2kqpU81S1tgVU1Drq+p7VNyfWlpzlnZX2Rct5CNew+TPKD/sW8Hn67fZk1idSz/mfGy6Pu6bTMb9TX/lZzt97z3yadmnW3M9tbTLrFzr5bpfWkRin3nnQ2F+ijUR6E+CvVRqI9CfRTqo1Afhfoo1EehPgr1UaiPQn0U6qNQH4X6KNRHoT4K9VGoj0J9FOqjUB+F+ijUR6E+CvVRqI9CfRTqS+9rG3rhsK5h+jekM++xMton79Kd91g5pQJtmx5KNUpcxBfvoTKKVUwULrzHyilWj63AU889AcW57tgYv2+QsKzMKdwkfNxSuOy76qFEm8P7LXo27+oo2/n17w3arDyKhgVrEuJxmF0YDG5QAAAAAAAADNgfdesmokdYjLIAAAAASUVORK5CYII="
            alt="plus"
          />
        </div>
        <div className={styles.delivery}>
          <p className={styles.cart_product_delivery}>배송비</p>
          <p className={styles.cart_product_delivery_price}>0원</p>
        </div>

        <div className={styles.payment}>
          <p className={styles.cart_product_payment}>결제 예정 금액</p>
          <p className={styles.cart_product_payment_price}>0</p>
        </div>
      </div>
    </>
  );
};

export default Cart;
