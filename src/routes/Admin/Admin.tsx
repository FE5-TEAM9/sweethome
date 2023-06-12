import AdminDashboard from '~/routes/Admin/AdminDashboard'
import AdminUser from '~/routes/Admin/AdminUser'
import AdminProduct from '~/routes/Admin/AdminProduct'
import AdminOrder from '~/routes/Admin/AdminOrder'
import styles from '~/styles/Admin.module.scss';

const Admin = () => {
  const adminCategory = ["대시보드", "사용자 관리", "상품 관리", "주문내역 관리"];

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.category}>
            <li>{adminCategory[0]}</li>
            <li>{adminCategory[1]}</li>
            <li>{adminCategory[2]}</li>
            <li>{adminCategory[3]}</li>
          </ul>
        </nav>
        <div className={styles.contents}>
          <AdminDashboard />
          <AdminUser />
          <AdminProduct />
          <AdminOrder />
        </div>
      </div>
    </>
  )
}

export default Admin;