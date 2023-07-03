import { GiHouse } from 'react-icons/gi';
import { LuCar } from 'react-icons/lu';
import styles from '~/styles/Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.container}>
        <div className={styles.car}>
          <LuCar />
        </div>
        <div className={styles.house}>
          <GiHouse />
        </div>
      </div>
    </div>
    
  )
}

export default Loading;