import styles from "~/styles/Mypage/MyOrderDetails.module.scss";
import { TfiClose } from "react-icons/tfi"
import { convertDate, convertPrice } from '~/utils/convert'

const MyOrderDetails = ({ setShowDetails, orderDetails }) => {
  return (
    <section className={styles.myOrderDetails}>
      <div className={styles.container}>
        <div 
          className={styles.closeBtn}
          onClick={() => setShowDetails(false)} 
        >
          <TfiClose />
        </div>
        <div className={styles.title}>
          <h2>주문 상세 정보</h2>
        </div>
        <div className={styles.details}>
          <div className={styles.photo}>
            <img
              src={orderDetails.product.photo}
              alt={orderDetails.product.title}
            />
          </div>
          <div className={styles.order_content}>
            <div className={styles.order_number}>
              <strong>주문번호</strong>
              <p>
                {orderDetails.product.productId}
              </p>
              <strong>주문날짜</strong>
              <p>
                {convertDate(orderDetails.timePaid)}
              </p>
            </div>
            <div className={styles.item_details}>
              <strong>{orderDetails.product.title}</strong>
              <p>상품금액 ₩{convertPrice(orderDetails.product.price)}</p>
              <p>상품확정 {orderDetails.done}</p>
            </div>
            <div className={styles.payment_details}>
              <h4>결제 상세</h4>
              <p>가상 계좌 결제 ₩{convertPrice(orderDetails.product.price)}</p>
              <div className={styles.bank}>
                <span>{orderDetails.account.bankName}</span>
                <span>({orderDetails.account.accountNumber})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrderDetails;
