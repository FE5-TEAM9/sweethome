import { adminAllTransactions, adminTransactions } from "~/api/requests"
import styles from "~/styles/admin/AdminOrder.module.scss"
import { useEffect, useState } from "react"
import Loading from "~/components/common/Loading"
import { convertDate, sortDate, convertPrice } from "~/utils/convert"

const AdminOrder = () => {
  const [allList, setAllList] = useState([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() =>{
    getAllTransactions();
  },[])
  
  // 전체 내역
  const getAllTransactions = async () => {
    try {
      const res = await adminAllTransactions();
      setAllList(res.sort((a, b) => sortDate(b.timePaid) - sortDate(a.timePaid)));
      console.log('관리자 거래 내역 성공', res);
    } catch (error) {
      console.log("관리자 거래 내역 확인 실패", error)
    }
  }
  
  console.log('sort거래내역',allList)
  // 거래 완료/취소
  const adminTransactionsHandler = async (e: React.MouseEvent<HTMLInputElement>, detailId) => {
    e.preventDefault();
    setIsLoading(true);

    const id = e.currentTarget.id;
    try {
      if (id === 'canceled') {
        const res = await adminTransactions(detailId, { isCanceled: !isCanceled });
        setIsCanceled(!isCanceled)
        console.log('구매취소 성공', res);
      } else {
        const res = await adminTransactions(detailId, { done: !isDone });
        setIsDone(!isDone)
        console.log('구매확정 성공', res);
      }

    } catch (error) {
      console.log("거래 완료/취소 실패", error);
    }
    setIsLoading(false);
      
  }
  
  return (
    <>
      {isLoading ? <Loading /> : null}
      <section className={styles.adminOrder}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>전체 거래 내역 관리</h2>
          </div>

          <div className={styles.list_nav}>
            <div className={styles.list_nav_container}>
              <div>NO.</div>
              <div>거래 내역 ID</div>
              <div>거래자 정보</div>
              <div>계좌 정보</div>
              <div>제품 정보</div>
              <div>거래 시간</div>
              <div>취소 여부</div>
              <div>완료 여부</div>
              <div>비고</div>
            </div>
          </div>

          <div className={styles.content}>
            <ul className={styles.allList}>
              {allList.map((list, i) => (
                <li 
                  className={styles.list}              
                  key={list.detailId}>
                  <p>{i + 1}</p>
                  <div className={styles.id}>
                    {list.detailId.slice(0, 8)}
                  </div>
                  <div className={styles.user}>
                    <p>{list.user.displayName}</p>
                    <p>{list.user.email}</p>
                  </div>
                  <div className={styles.bank}>
                    <p>{list.account.backName}</p>
                    <p>{list.account.accountNumber}</p>
                  </div>
                  <div className={styles.product}>
                    <p>{list.product.title}</p>
                    <p>{convertPrice(list.product.price)}</p>
                    <p>{list.product.tags}</p>
                  </div>
                  <div className={styles.time}>
                    <p>{convertDate(list.timePaid)}</p>
                  </div>
                  <div className={styles.isCanceled}>
                    <p>{list.isCanceled ? "O" : "X"}</p>
                  </div>
                  <div className={styles.isDone}>
                    {list.done ? "O" : "X"}
                  </div>
                  <div className={styles.listBtn}>
                    {list.isCanceled
                      ? null
                      : 
                      <input
                        type="button"
                        value="구매취소"
                        className={styles.cancleBtn}
                        id="canceled"
                        onClick={(e)=>adminTransactionsHandler(e, list.detailId)}
                      />
                    }
                    {list.done 
                      ? null
                      : 
                      <input
                        type="button"
                        value="구매확정"
                        className={styles.confirmBtn}
                        id="done"
                        onClick={(e)=>adminTransactionsHandler(e, list.detailId)}
                        disabled={list.done ? true : false}/>
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminOrder;