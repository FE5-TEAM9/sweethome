import styles from '~/styles/Admin/AdminDashBoard.module.scss'

const AdminDashboard = () => {
  return (
    <section className={styles.adminDashboard}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>대시보드</h2>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard