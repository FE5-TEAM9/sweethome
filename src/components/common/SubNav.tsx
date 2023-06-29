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
              onClick={()=> {
                setCategory(category)}
              }
            >
              <span className={styles.active}>
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
