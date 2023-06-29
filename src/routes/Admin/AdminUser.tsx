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
  const tableHead = ["NO", "이름", "이메일"];

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
            <table>
              <thead>
                <tr>
                  {tableHead.map(item => (
                    <th key={item}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user: User, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminUser;
