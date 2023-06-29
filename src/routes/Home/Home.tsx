import { Slider } from "~/utils/slider.tsx";
import styles from "~/styles/Home/Home.module.scss";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const user = useSelector((state: any) => state.info);

  useEffect(() => {
    console.log("user", user);
  }, [user]);
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
