import { useState } from "react";
import styles from "~/styles/SubNav.module.scss";

const SubNav = ({ subNav, setCategory }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.container}>
          {subNav.map(category => (
            <div
              className={styles.category}
              onClick={()=> {setCategory(category)}}
              >
            <span>
              {category}
            </span>
          </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default SubNav;
