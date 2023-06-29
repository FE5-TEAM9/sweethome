import { NavLink } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import styles from "~/styles/TheHeader.module.scss";
import { logOut } from "~/api/requests";
import { useSelector, useDispatch } from "react-redux";
import TheSearchBar from "~/components/common/TheSearchBar";
import { useState } from "react";

const TheHeader = () => {
  const [search, setSearch] = useState();
  const [searchIsClicked, setSearchIsClicked] = useState(false);

  const logout = useSelector((state: any) => state.logout);
  const dispatch = useDispatch();

  const logOutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT", state: false });
    dispatch({ type: "RETURN", account: {} });
    try {
      const res = await logOut();
      console.log("로그아웃 정보", res);
    } catch (err) {
      console.log("로그아웃 오류", err);
    }
  };

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
            {logout ? (
              <span
                className={styles.userLogout}
                onClick={logOutHandler}>
                Logout
              </span>
            ) : (
              <div>
                <span className={styles.userLogin}>
                  <NavLink to="/login">Login</NavLink>
                </span>
                <span className={styles.userSignUp}>
                  <NavLink to="/signup">Sign-Up</NavLink>
                </span>
              </div>
            )}
          </div>
          <div className={styles.icons}>
            <NavLink to="/mypage">
              <FaUserAlt className={styles.mypage} />
            </NavLink>
            <NavLink to="/cart">
              <FaShoppingBag className={styles.shoppingbag} />
            </NavLink>
            <div className={styles.search}>
              {searchIsClicked && (
                <TheSearchBar
                  className={styles.searchBar}
                  search={search}
                  onChange={(e: any) => setSearch(e.target.value)}
                />
              )}
              <AiOutlineSearch
                className={styles.searchIcon}
                onClick={() => setSearchIsClicked(!searchIsClicked)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default TheHeader;
