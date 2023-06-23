import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from "swiper";
import "swiper/swiper-bundle.min.css";
import main1 from "/public/assets/Home/main1.jpeg";
import main2 from "/public/assets/Home/main2.jpeg";
import main3 from "/public/assets/Home/main3.jpeg";
import styles from "~/styles/utils/Slider.module.scss";

export const Slider = ({}) => {
  return (
    <Swiper
      className={styles.slider}
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
      spaceBetween={1288}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}>
      <SwiperSlide className={styles.slides}>
        <img
          className={styles.images}
          src={main1}
          alt="main1"
        />
      </SwiperSlide>
      <SwiperSlide className={styles.slides}>
        <img
          className={styles.images}
          src={main2}
          alt="main2"
        />
      </SwiperSlide>
      <SwiperSlide className={styles.slides}>
        <img
          className={styles.images}
          src={main3}
          alt="main3"
        />
      </SwiperSlide>
    </Swiper>
  );
};
