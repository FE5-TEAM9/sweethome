import styles from "~/styles/Home.module.scss";

const Home = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.notice}>
          <span className={styles.title}>Notice</span>
          <span>사진 리뷰 작성 시 5000p 지급 이벤트를 확인해주세요.</span>
        </div>
      </div>
    </>
  );
};

export default Home;
