import React from "react";
import styles from "./mainPage.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainPostCard from "../../components/MainPostCard/mainPostCard";
import RecommendPostCard from "../../components/RecommendCard/recommendCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";


const CustomRightArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customRightArrow}>
      <AiFillCaretRight className={styles.RightArrow} size={50} />
    </button>
  );
};

const CustomLeftArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customLeftArrow}>
      <AiFillCaretLeft className={styles.LeftArrow} size={50} />
    </button>
  );
};



const MainPage: React.FC = () => {
  const adImages = [
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
  };

  return (
    <div className={styles.conatainer}>
      <div className={styles.adContainer}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          infiniteLoop={true}
          autoPlay
          interval={3000}
          showIndicators={false}
        >
          {adImages.map((url, index) => (
            <div key={index}>
              <img src={url} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.mainPost}>
        <div className={styles.title}>룸메이트 구해요 👋</div>
        <MultiCarousel
          responsive={responsive}
          infinite={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
          <MainPostCard />
        </MultiCarousel>
      </div>
      <div className={styles.recommendPost}>
        <div className={styles.title}>방갑고에서 추천하는 룸메이트를 만나보세요 💌</div>
        <MultiCarousel
          responsive={responsive}
          infinite={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
          <RecommendPostCard />
        </MultiCarousel>
      </div>
    </div>
  );
};

export default MainPage;
