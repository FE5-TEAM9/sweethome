import styles from "~/styles/Mypage/MyOrder.module.scss";
import {
  cancelTransaction,
  confirmedTransaction,
  getAllTransactions,
  getTransaction,
} from "~/api/requests";
import { useEffect, useState } from "react";
import { convertPrice, convertDate, sortDate } from "~/utils/convert";
import MyOrderDetails from "./MyOrderDetails";
import Loading from "~/components/common/Loading";

const MyOrder = () => {
  const [allList, setAllList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [watch, setWatch] = useState(false);

  const example = [...allList];

  useEffect(() => {
    allTransactions();
  }, [watch]);

  // 전체 내역
  const allTransactions = async () => {
    setIsLoading(true);
    try {
      const allRes = await getAllTransactions();

      setAllList(
        allRes
          .filter((res) => !res.isCanceled)
          .sort((a, b) => sortDate(b.timePaid) - sortDate(a.timePaid))
      );
      console.log(allList);
    } catch (error) {
      console.log("전체 거래내역 조회 실패", Error);
    } finally {
      setIsLoading(false);
    }
  };

  // 구매 취소
  const cancelHandler = async (
    e: React.MouseEvent<HTMLInputElement>,
    id: string
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const body = { detailId: id };
      const res = await cancelTransaction(body);
      if (res) {
        alert("구매 취소되었습니다.");
        setWatch(!watch)
        console.log("구매취소", res);
      } else {
        alert("구매 확정된 상품을 취소할 수 없습니다.");
      }
    } catch (error) {
      console.log("구매취소 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 구매 확정
  const confirmHandler = async (
    e: React.MouseEvent<HTMLInputElement>,
    Id: string
  ) => {
    e.preventDefault();
    try {
      const body = { detailId: Id };
      const res = await confirmedTransaction(body);
      if (res) {
        setWatch(!watch)
        console.log("구매확정", res);
      }
    } catch (error) {
      console.log("구매확정 실패", error);
    }
  };

  // 단일 상품 상세
  const showDetailsHandler = async (
    e: React.MouseEvent<HTMLInputElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      const body = { detailId: id };
      const res = await getTransaction(body);
      setOrderDetails(res);
      console.log("단일상품상세 성공", res);
      setShowDetails(true);
    } catch (error) {
      console.log("단일상품상세 실패", error);
    }
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      {showDetails ? (
        <MyOrderDetails
          setShowDetails={setShowDetails}
          orderDetails={orderDetails}
        />
      ) : null}
      <section className={styles.myOrder}>
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
                    <img
                      src={list.product.thumbnail}
                      alt={list.product.title}
                    />
                  </div>
                  <span>{list.product.title}</span>
                  <span>{convertPrice(list.product.price)}</span>
                  <span>{convertDate(list.timePaid)}</span>
                  <span>{list.done ? "O" : "X"}</span>
                  <div className={styles.listBtn}>
                    {list.done
                      ? null
                      : 
                      <input
                        type="button"
                        value="구매취소"
                        className={styles.cancelBtn}
                        onClick={(e) => {
                          cancelHandler(e, list.detailId);
                        }}
                      />
                    }
                    {list.done 
                      ? null
                      : 
                      <input
                        type="button"
                        value="구매확정"
                        className={styles.confirmBtn}
                        onClick={(e) => confirmHandler(e, list.detailId)}
                        disabled={list.done ? true : false}
                      />
                    }
                    <input
                      type="button"
                      value="상세정보"
                      className={styles.confirmBtn}
                      onClick={(e) => {
                        console.log(list.detailId);
                        showDetailsHandler(e, list.detailId);
                      }}
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

export default MyOrder;
