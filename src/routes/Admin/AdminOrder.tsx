import { useEffect, useState } from "react";
import { adminAllTransactions, adminTransactions } from "~/api/requests";
import { convertDate, sortDate, convertPrice } from "~/utils/convert";
import Loading from "~/components/common/Loading";
import styles from "~/styles/admin/AdminOrder.module.scss";

const AdminOrder = () => {
  const [allList, setAllList] = useState<any[]>([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() =>{
    getAllTransactions();
  },[])
  
  // 전체 거래 내역 조회
  const getAllTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await adminAllTransactions();
      setAllList(res.sort((a: any, b: any) => sortDate(b.timePaid) - sortDate(a.timePaid)));
    } catch (error: any) {
      alert(error.message);
    }
    setIsLoading(false);
  }

  // 거래 완료 및 취소
  const adminTransactionsHandler = async (e: React.MouseEvent<HTMLInputElement>, detailId: string) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    try {
      if (id === 'canceled') {
        await adminTransactions(detailId, { isCanceled: !isCanceled });
        setIsCanceled(!isCanceled);
      } else {
        await adminTransactions(detailId, { done: !isDone });
        setIsDone(!isDone);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  interface TransactionDetail {
    detailId: string
    user: {
      email: string
      displayName: string
      profileImg: string | null
    }
    account: {
      bankName: string
      bankCode: string
      accountNumber: string
    }
    product: {
      productId: string
      title: string
      price: number
      description: string
      tags: string[]
      thumbnail: string | null
      discountRate: number
    }
    timePaid: string
    isCanceled: boolean
    done: boolean
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
              {allList.map((list: TransactionDetail, i) => (
                <li
                  className={styles.list}              
                  key={list.detailId}>
                  <p className={styles.num}>{i + 1}</p>
                  <div className={styles.id}>
                    {list.detailId.slice(0, 8)}
                  </div>
                  <div className={styles.user}>
                    <p>{list.user.displayName}</p>
                    <p>{list.user.email}</p>
                  </div>
                  <div className={styles.bank}>
                    <p>{list.account.bankName}</p>
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
                    <p>{list.isCanceled ? "✅" : "❌"}</p>
                  </div>
                  <div className={styles.isDone}>
                    {list.done ? "✅" : "❌"}
                  </div>
                  <div className={styles.listBtn}>
                    {(list.isCanceled || list.done)
                      ? "🏠"
                      : 
                      <input
                        type="button"
                        value="구매취소"
                        className={styles.cancelBtn}
                        id="canceled"
                        onClick={(e)=>adminTransactionsHandler(e, list.detailId)}
                      />
                    }
                    {(list.done || list.isCanceled)
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