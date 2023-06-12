import { NavLink } from "react-router-dom"

const AdminSideBar = () => {
  const adminTabs = [
    {
      name: "대시보드",
      path: "/admin/dashboard"
    },
    {
      name: "사용자 관리",
      path: "/admin/userdata"
    },
    {
      name: "상품 관리",
      path: "/admin/productdata"
    },
    {
      name: "거래내역 관리",
      path: "/admin/orderhistory"
    }
  ]

  return (
    <>
      {
        adminTabs.map(adminTab => {
          <NavLink to={adminTab.path}>
            <li>{adminTab.name}</li>
          </NavLink>
        })
      }
    </>
  )
}

export default AdminSideBar