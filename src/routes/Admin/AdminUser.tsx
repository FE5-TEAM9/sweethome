import { useState, useEffect } from "react";
import { users } from "~/api/requests";
import styles from "~/styles/Admin/AdminUser.module.scss";

const AdminUser = () => {
  interface User {  
    email: string
    displayName: string
    profileImg: string
  }
  
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  
  // 사용자 목록 조회
  const getUsers = async () => {
    try {
      const res = await users();
      setAllUsers(res);
    } catch (error) {
      alert("사용자 목록 조회 실패!")
    }
  };

  return (
    <>
      <section className={styles.adminUser}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>사용자 관리</h2>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list_nav}>
              <div className={styles.list_nav_container}>
                <div>NO.</div>
                <div>이름</div>
                <div>이메일</div>
              </div>
            </div>
            <div className={styles.list}>
              <ul className={styles.list_container}>
                {allUsers.map((user: User, i) => (
                  <li key={i}>
                    <div>{i + 1}</div>
                    <div>{user.displayName}</div>
                    <div>{user.email}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminUser;
