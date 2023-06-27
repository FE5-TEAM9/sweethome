import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "~/styles/SubNav.module.scss";

const SubNav = ({ subNav, setCategory }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.container}>
          {subNav.map(category => (
            <NavLink
              to='#'
              onClick={()=> {
                setCategory(category)
              }}
              className={({ isActive }) =>
              isActive ? styles.active : ""}
            >
              {category}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};


export default SubNav;
