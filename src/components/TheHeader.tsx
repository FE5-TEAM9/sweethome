import { NavLink } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
import "~/styles/TheHeader.scss";

const TheHeader = () => {
  return (
    <header>
      <div>SWEET HOME</div>
      <div>
        <ul>
          <li>
            <NavLink to="/about">
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
