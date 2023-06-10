import React, { useState, useEffect } from "react"
import styles from '~/styles/Board.module.scss'
import All from "./All";
import Question from "./Question";
import Review from "./Review";

const Board = () => {

  const [selectItem, setItem] = useState(0);

  return (
    <div className={styles.container}>
      <h2>게시판</h2>
      <div className={styles.buttonSection}>
        <div />
        <div>
          <button className={selectItem===0? styles.activeButton : styles.inactiveButton} onClick={()=>setItem(0)}>{`ALL`}</button>
          <button className={selectItem===1? styles.activeButton : styles.inactiveButton} onClick={()=>setItem(1)}>{`Q & A`}</button>
          <button className={selectItem===2? styles.activeButton : styles.inactiveButton} onClick={()=>setItem(2)}>{`REVIEW`}</button>
        </div>
        <div>
          <button>{`글쓰기`}</button>        
        </div>
      </div>

      {
        selectItem === 0?
        <All />
        :
        selectItem === 1?
        <Question />
        :
        <Review />
      }


    </div>
    
  )
}

export default Board