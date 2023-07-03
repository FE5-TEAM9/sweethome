import about from '/public/assets/about/about.jpeg';
import styles from '~/styles/About/About.module.scss';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.aboutImg}>
          <img src={about} alt="" />
        </div>
        <div className={styles.aboutText}>
          <h2 className={styles.title}>
            SWEET HOME
          </h2>
          <p className={styles.introduction}>
            당신에게 집이란 어떤 의미인가요?<br />
            언제, 어디서나 집을 가고싶게 만들 수 있는 첫 걸음<br />
            집 가구싶어에서 시작해 보세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;