import { NavLink } from "react-router-dom";
import { RiEmotionUnhappyLine } from "react-icons/ri"
import styles from "~/styles/NotFound/NotFound.module.scss";

const NotFount = () => {
  return (
    <>
      <section className={styles.notfound}>
        <div className={styles.container}>
          <div className={styles.textbox}>
            <RiEmotionUnhappyLine />
            <strong>404</strong>
            <p>페이지를 찾을 수 없습니다.</p>
          </div>
          <div className={styles.btn}>
            <NavLink to="/sweethome">
              <input type="button" value="Go To Home...🏠" />
            </NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFount;