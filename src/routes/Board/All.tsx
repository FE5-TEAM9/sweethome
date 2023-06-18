import styles from '~/styles/Board/Board.module.scss'

const All = () => {
  return (
    <div>
      <div className={styles.allTitleBar}>
         <span>No.</span>
          <span>제목</span>
          <span>작성일</span>
          <span>작성자</span>
        </div>
        <div className={styles.ex}>
             <span>예시 입니다.</span>      
           <div>
             <span>예시 입니다.</span>
           </div>
           <div>
             <span>예시 입니다.</span>
           </div>
       </div>
     </div>
     )
}

export default All