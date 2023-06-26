import styles from "~/styles/Mypage/Transactions.module.scss";
import {
  cancelTransaction,
  confirmedTransaction,
  getAllTransactions,
  getTransaction
} from "~/api/requests";
import { useEffect, useState } from "react";

const Transactions = () => {
  const [allList, setAllList] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    allTransactions();
  },[])

  // 전체 내역
  const allTransactions = async () => {
    try {
      const allRes = await getAllTransactions();
      setAllList(allRes);
      console.log(allRes);
    } catch (error) {
      console.log("전체 거래내역 조회 실패", Error);
    }
  };

  // 구매 취소
  const cancleHandler = async (e: React.MouseEvent<HTMLInputElement>, detailId: string) => {
    e.preventDefault();
    try {
      const res = await cancelTransaction({detailId});
      console.log('구매취소', res)
      const updateTransaction = allList.filter(item => item.detailId !== detailId);
      setAllList(updateTransaction);
    } catch (error) {
      console.log("구매취소 실패", error)
    }
  }

  // 구매 확정
  const confirmHandler = async (e: React.MouseEvent<HTMLInputElement>, detailId: string) => {
    e.preventDefault();
    try {
      const res = await confirmedTransaction({detailId});
      console.log('구매확정', res);
      // const updateTransaction = allList
      // setAllList(updateTransaction);
    } catch (error) {
      console.log("구매확정 실패", error)
    }
  }
  
  return (
    <>
      <section className={styles.transactions}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>주문 내역 관리</h2>
          </div>

          <div className={styles.list_nav}>
            <div className={styles.list_nav_container}>
              <div>NO.</div>
              <div>상품 이미지</div>
              <div>상품명</div>
              <div>상품 가격</div>
              <div>주문 일자</div>
              <div>구매 확정</div>
              <div></div>
            </div>
          </div>

          <div className={styles.content}>
            <ul className={styles.allList}>
              {allList.map((list, i) => (
                <li className={styles.list} key={list.datailId}>
                  <span>{i + 1}</span>
                  <div className={styles.listImg}>
                    <img src={list.product.thumbnail} alt={list.product.title} />
                  </div>
                  <span>{list.product.title}</span>
                  <span>{list.product.price}</span>
                  <span>{list.timePaid}</span>
                  <span>
                    {isDone ? "O" : "X"}
                  </span>
                  <div className={styles.listBtn}>
                    <input
                      type="button"
                      value="구매취소"
                      className={styles.cancleBtn}
                      onClick={(e) => cancleHandler(e, list.detailId)}
                    />
                    <input 
                      type="button"
                      value="구매확정"
                      className={styles.confirmBtn}
                      onClick={(e) => confirmHandler(e, list.detailId)}
                    />
                  </div>
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transactions;
