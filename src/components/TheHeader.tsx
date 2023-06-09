import { Link } from "react-router-dom"
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
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            SHOP
          </li>
          <li>
            BOARD
          </li>
        </ul>
      </div>
      <div>
        <div className="user">
          <span>
            Login
          </span>
          <span>|</span>
          <span>
            Sign-Up
          </span>
        </div>
        <div className="icons">
          <FaUserAlt className="mypage" />
          <FaShoppingBag className="shoppingbag" />
          <AiOutlineSearch className="search" />
        </div>
      </div>
    </header>
  );
};
export default TheHeader;
