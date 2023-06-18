import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import styles from "~/styles/TheHeader.module.scss";

const TheHeader = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/">SWEET HOME</NavLink>
        </div>
        <div className={styles.navbar}>
          <ul>
            <li className={styles.menu}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.active : `menu`
                }>
                ABOUT
              </NavLink>
            </li>
            <li className={styles.menu}>
              <NavLink
                to="/shop"
                className={({ isActive }) => (isActive ? styles.active : "")}>
                SHOP
              </NavLink>
            </li>
            <li className={styles.menu}>
              <NavLink
                to="/board"
                className={({ isActive }) => (isActive ? styles.active : "")}>
                BOARD
              </NavLink>
            </li>
          </ul>
        </div>
        <div className={styles.subNav}>
          <div className={styles.user}>
            <span className={styles.userLogin}>
              <NavLink to="/login">Login</NavLink>
            </span>
            <span className={styles.userSignUp}>
              <NavLink to="/signup">Sign-Up</NavLink>
            </span>
          </div>
          <div className={styles.icons}>
            <NavLink to="/mypage">
              <FaUserAlt className="mypage" />
            </NavLink>
            <NavLink to="/cart">
              <FaShoppingBag className="shoppingbag" />
            </NavLink>
            <AiOutlineSearch className="search" />
          </div>
        </div>
      </div>
    </header>
  );
};
export default TheHeader;
