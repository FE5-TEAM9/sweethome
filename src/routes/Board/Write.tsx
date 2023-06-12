import styles from '~/styles/Write.module.scss'

const Write = () => {
  return (
    <div>
        <h1 className={styles.name}>글쓰기</h1>
      <div>
        <textarea className={styles. textarea} placeholder='내용을 입력하세요.' name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div className={styles.button}>
        <button className={styles.btn}>취소</button>
        <button className={styles.btn}>저장</button>
      </div>
    </div>
  )
}

export default Write