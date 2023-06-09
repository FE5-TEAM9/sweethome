import { NavLink } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import styles from "~/styles/TheHeader.module.scss";

const TheHeader = () => {
  return (
    <header>
      <div>
        <NavLink to="/">
          SWEET HOME
        </NavLink>
      </div>
      <div>
        <ul className={styles.ul}>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop">
              SHOP
            </NavLink>
          </li>
          <li>
            <NavLink to="/board">
              BOARD
            </NavLink>
          </li>
        </ul>
      </div>
      <div>
        <div className="user">
          <span>
            <NavLink to="/login">
              Login
            </NavLink>
          </span>
          <span>|</span>
          <span>
            <NavLink to="/signup">
              Sign-Up
            </NavLink>
          </span>
        </div>
        <div className="icons">
          <NavLink to="/mypage">
            <FaUserAlt className="mypage" />
          </NavLink>
          <NavLink to="/cart">
            <FaShoppingBag className="shoppingbag" />
          </NavLink>
          <AiOutlineSearch className="search" />
        </div>
      </div>
    </header>
  );
};
export default TheHeader;
