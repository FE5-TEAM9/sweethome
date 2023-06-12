import { NavLink } from 'react-router-dom';
import styles from '~/styles/Admin.module.scss';

const Admin = () => {
  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.category}>
            <NavLink to="/admin/dashboard">
              <li>대시보드</li>
            </NavLink>
            <li>사용자 관리</li>
            <li>상품 관리</li>
            <li>주문내역 관리</li>
          </ul>
        </nav>
        <div className={styles.contents}>
          {}
        </div>
      </div>
    </>
  )
}

export default Admin;