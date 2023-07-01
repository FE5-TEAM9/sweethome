import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import { logOut } from "~/api/requests";
import TheSearchBar from "~/components/common/TheSearchBar";
import styles from "~/styles/TheHeader.module.scss";

const TheHeader = () => {
  const [search, setSearch] = useState("");
  const [searchIsClicked, setSearchIsClicked] = useState(false);

  const logout = useSelector((state: any) => state.logout);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃
  const logOutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT", state: false });
    dispatch({ type: "RETURN", account: {} });
    try {
      await logOut();
      alert("로그아웃 완료되었습니다.")
      navigate("/sweethome")
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/sweethome">SWEET HOME</NavLink>
        </div>
        <div className={styles.navbar}>
          <ul>
            <li className={styles.menu}>
              <NavLink
                to="/sweethome/about"
                className={({ isActive }) =>
                  isActive ? styles.active : `menu`
                }>
                ABOUT
              </NavLink>
            </li>
            <li className={styles.menu}>
              <NavLink
                to="/sweethome/shop"
                className={({ isActive }) => (isActive ? styles.active : "")}>
                SHOP
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
                  <NavLink to="/sweethome/login">Login</NavLink>
                </span>
                <span className={styles.userSignUp}>
                  <NavLink to="/sweethome/signup">Sign-Up</NavLink>
                </span>
              </div>
            )}
          </div>
          <div className={styles.icons}>
            <NavLink to="/sweethome/mypage">
              <FaUserAlt className={styles.mypage} />
            </NavLink>
            <NavLink to="/sweethome/cart">
              <FaShoppingBag className={styles.shoppingbag} />
            </NavLink>
            <div className={styles.search}>
              {searchIsClicked && (
                <TheSearchBar
                  className={styles.searchBar}
                  search={search}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} 
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
