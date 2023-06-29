import { Slider } from "~/utils/slider.tsx";
import styles from "~/styles/Home/Home.module.scss";

const Home = () => {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <Slider />
        </div>
      </main>
    </>
  );
};

export default Home;
