import styles from "~/styles/SubNav.module.scss";

const SubNav = ({ subNav, setCategory }) => {
  return (
    <>
      <div className={styles.subnav}>
        <div className={styles.container}>
          {subNav.map(category => (
            <div 
              className={styles.catagory}
              onClick={()=> setCategory(category)}
              >
            <span>{category}</span>
          </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default SubNav;
