import "~/styles/TheHeader.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingBag, FaUserAlt } from "react-icons/fa";
const TheHeader = () => {
  return (
    <header>
      <div>SWEET HOME</div>
      <div>
        <ul>
          <li>ABOUT</li>
          <li>SHOP</li>
          <li>BOARD</li>
        </ul>
      </div>
      <div>
        <div className="user">
          <span>Login</span>
          <span>|</span>
          <span>Sign-In</span>
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
