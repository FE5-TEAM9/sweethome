import React from "react";
import styles from '~/styles/About/About.module.scss';

const About: React.FC = () => {
  return (
    <div className={styles.uploadSection}>
      <div className={`${styles.uploadSection__image} ${styles["uploadSection__image--left"]}`}>
        {/* 왼쪽 이미지 컨텐츠 */}
      </div>
      <div className={`${styles.uploadSection__text}`}>
        React, TypeScript, Rest API를 활용한 라이프 스타일 홈 데코·인테리어 쇼핑몰 프로젝트입니다.
      </div>
    </div>
  );
};

export default About;