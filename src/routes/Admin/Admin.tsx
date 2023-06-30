import { useState } from 'react'
import AdminUser from '~/routes/Admin/AdminUser'
import AdminProduct from '~/routes/Admin/AdminProduct'
import AdminOrder from '~/routes/Admin/AdminOrder'
import SubNav from '~/components/common/SubNav'
import styles from '~/styles/Admin/Admin.module.scss';

const Admin = () => {
  const subNav: string[]  = ["사용자 관리", "상품 관리", "주문 내역 관리"];
  const [category, setCategory] = useState("");

  return (
    <>
      <SubNav subNav={subNav} setCategory={setCategory} />
      <div className={styles.container}>
        <div className={styles.contentsWrapper}>
          <div className={styles.contents}>
            {
              (category === "사용자 관리" || category === "")
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