import { SubNavProps } from "~/types";
import styles from "~/styles/SubNav.module.scss";

const SubNav = ({ subNav, setCategory }: SubNavProps) => {
  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.container}>
          {subNav.map((category: string) => (
            <div
              className={styles.category}
              onClick={() => {
                setCategory(category);
              }}>
              <span>{category}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubNav;
