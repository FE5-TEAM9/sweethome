import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminUser from '~/routes/Admin/AdminUser'
import AdminProduct from '~/routes/Admin/AdminProduct'
import AdminOrder from '~/routes/Admin/AdminOrder'
import SubNav from '~/components/common/SubNav'
import styles from '~/styles/Admin/Admin.module.scss';


const Admin = () => {
  const subNav: string[]  = ["사용자 관리", "상품 관리", "주문 내역 관리"];
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('관리자 전용 페이지입니다! ⚙️');
      navigate('/');
    }
  },[])

  return (
    <>
      {localStorage.getItem('token') === `${import.meta.env.VITE_ACCOUNT_TOKEN}` ?
        <div>
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
        </div>
      : <div>관리자 페이지입니다. 관리자 계정으로 로그인 해주세요.</div>
      }
    </>
  )
}

export default Admin;