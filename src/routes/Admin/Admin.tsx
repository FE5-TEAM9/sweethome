import { useState } from 'react'
import AdminDashboard from '~/routes/Admin/AdminDashboard'
import AdminUser from '~/routes/Admin/AdminUser'
import AdminProduct from '~/routes/Admin/AdminProduct'
import AdminOrder from '~/routes/Admin/AdminOrder'
import styles from '~/styles/Admin/Admin.module.scss';

const Admin = () => {
  const [category, setCategory] = useState("대시보드");
  const adminCategory = ["대시보드", "사용자 관리", "상품 관리", "주문내역 관리"];

  const adminCategoryHandler = ( e: React.ChangeEvent<HTMLSelectElement> ) => {
    if (e.target.value === "대시보드") {
      setCategory("대시보드")
    } else if (e.target.value === "사용자 관리") {
      setCategory("사용자 관리")
    } else if (e.target.value === "상품 관리") {
      setCategory("상품 관리")
    } else if (e.target.value === "주문내역 관리") {
      setCategory("주문내역 관리")
    }
  }

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <select
            className={styles.category}
            onChange={adminCategoryHandler}
            value={category}>
            {
              adminCategory.map(item => (
                <option
                  key={item}
                  value={item}>
                  {item}
                </option>
              ))
            }
          </select>
        </nav>
        <div className={styles.contentsWrapper}>
          <div className={styles.contents}>
            {
              category === "대시보드" 
                ? <AdminDashboard />
                : category === "사용자 관리" 
                  ? <AdminUser />
                  : category === "상품 관리"
                    ? <AdminProduct />
                    : <AdminOrder />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin;